const express = require('express');
const router = express.Router();
const OrderService = require('./service.js');

router.post('/', async (req, res, next) => {
  try {

    const userId = 'dev|1234567'
    // const userId = req.oidc.user.sub
    const order = await OrderService.createOrder(userId, req.body.purchases);
    // res.redirect(303, stripeSession.url);
    res.json(order)
      
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/', async (req, res, next) => {
      // const userId = req.oidc.user.sub
  const userId = 'dev|1234567'
  const status = req.query.status
  const page = req.query.page
  let filters = {userId}
  if(status){
    filters.status = status;
  }
  const userOrders = await OrderService.getUserOrders(filters, page)
  res.status(200).json(userOrders);
});

router.delete('/:id', async (req,res)=>{

  try{
    const deletedProduct = await OrderService.deleteOrder(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
})

// router.get('/checkout/success', async (req,res)=>{
//   OrderService.confirmPayment(req)
//   res.send('SUCCESSFUL CHECKOUT')
// })

// router.get('/checkout/cancel', async (req,res)=>{
//   console.log("CALLLELLLLEDLDEDLD")
//   res.send('FAILED CHECKOUT')
// })

router.post('/stripe_webhook', express.raw({type: 'application/json'}), (request, response) => {
  try {
    OrderService.handleStripeEvent(request);  // Return a 200 response to acknowledge receipt of the event
    response.send();
  } catch (error) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;
