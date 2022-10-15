require('dotenv').config()
const { default: mongoose } = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const ProductService = require('../products/service.js');
const Order = require('./model.js');
const service = {};
const isValidQuantity = (qty) => {
    return Number.isInteger(qty) && qty > 0;
}

const isSufficientStock = (qty, currStock) => {
    return qty <= currStock;
}

const arePurchasesValid =  (purchases) => {
    return purchases.every(p=> 
        isValidQuantity(p.qty) 
        && isSufficientStock(p.qty, p.currStock));
}

const createStripeSession = (purchases, userId) =>{
    const line_items = purchases.map(p=>({
        price_data:{
            currency: 'egp',
            product_data: {
                name: p.name,
            },
            unit_amount: p.currPrice
        },
        quantity: p.qty
    }));
    return stripe.checkout.sessions.create({
        line_items,
        client_reference_id: userId,
        mode: 'payment',
        expires_at: Math.floor(Date.now() / 1000) + (3600 * (1/2)), // Configured to expire after 30 mins
        success_url: `${process.env.PUBLIC_BASE_URL}/api/orders/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.PUBLIC_BASE_URL}/api/orders/checkout/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

}

const completeOrder = (stripePayment) =>{
    Order.findOneAndUpdate({stripePaymentId:stripePayment.id},{status:'PAID'})
    .catch(e=>{
        console.log(e)
    })
}

const expireOrder = (stripePayment)=>{
    try {
        const remover = (session)=> Order.findOneAndUpdate({stripePaymentId:stripePayment.id},{status:'FAILED'},{session});
        rollBackOrder(remover);            
    } catch (error) {
        if(error === 'order not found'){
            console.log(`order with payment id ${stripePayment.id} was already cancelled by user`)
        }
    }
}

const rollBackOrder = async (remover) =>{  
    try {        
        let order;
        const session = await mongoose.startSession();
        await session.withTransaction(async (session) => {
            try{
                order =  await remover(session);
                // if(!order) throw 'order not found'
                if(!order) return
                let productUpdates = order.purchases.map(p => ProductService.updateProduct(
                    {_id: p.product },
                    { $inc: { stock: p.qty } },
                    session
                ))
                await Promise.all(productUpdates);      
            } catch (error) {
                console.log("order rollback failed: "+ error)    
                throw error;
            }
        }).catch((error)=>{
            console.log(error);
        })
        return order            
    } catch (error) {   
    }   
}

service.createOrder = async (userId, purchases)=>{

    const session = await mongoose.startSession();
    let orderRes = null;
    await session.withTransaction(async (session) => {
        // Your transaction methods
        const valid = arePurchasesValid(purchases); 
        if(!valid){
            throw "some purchaeses not valid" ;
        }
        let productUpdates = purchases.map(p => ProductService.updateProduct(
            {_id: p.product, stock: p.currStock, price:p.currPrice, name:p.name},
            { $inc: { stock: - p.qty } },
            session
        ))
        productUpdates = await Promise.all(productUpdates);
        if(productUpdates.some(p=>p==null)){
            throw "some products stock/prices were changed, please try again" ;
        }

        const checkoutSession = await createStripeSession(purchases, userId);      
        const order = new Order({
            userId, 
            purchases, 
            totalPrice: checkoutSession.amount_total,
            stripePaymentId: checkoutSession.payment_intent,
            stripePaymentUrl: checkoutSession.url
        });
        await order.save({ session })
        orderRes = order;
    })
    .catch(error=>{
        console.log(error);
        throw {message: error}
    })
    return orderRes;
}

service.handleStripeEvent = async (request)=>{
    const sig = request.headers['stripe-signature'];

    let event = stripe.webhooks.constructEvent(request.body, sig, webhookSecret);
    const payment = event.data.object
    
    switch (event.type) {
        case 'payment_intent.canceled':  //expired
            expireOrder(payment)
        break;
        case 'payment_intent.succeeded': //succeded
            completeOrder(payment)
        break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    
}

service.deleteOrder = (orderId, userId)=>{
    const remover = (session)=> Order.findOneAndDelete({_id:orderId, userId, status:'PENDING'}, {session});
    return rollBackOrder(remover);
}
service.getUserOrders = (filters = {}, page = 0) => {
    const perPage = 10;
    return Order.find(filters, '-stripePaymentId', {sort: {createdAt: 'desc'}, skip: page * perPage, limit: perPage})  
}

module.exports = service