const express = require('express');
const { checkJwt } = require('../middleware');
const router = express.Router();
const OrderService = require('./service.js');

router.post('/', checkJwt, async (req, res) => {
  try {

    const userId = req.auth.sub
    const order = await OrderService.createOrder(userId, req.body.purchases);
    // res.redirect(303, stripeSession.url);
    res.json(order)
      
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/', checkJwt, async (req, res, next) => {
  const userId = req.auth.sub;
  const status = req.query.status;
  const page = req.query.page || 0;
  let filters = {userId};
  if(status){
    filters.status = status;
  }
  const userOrders = await OrderService.getUserOrders(filters, page)  
  res.status(200).json(userOrders);
});

router.delete('/:id', checkJwt, async (req,res)=>{

  if(!req.params.id){
    return res.status(400).json({message:'missing order id'})
  }
  const userId = req.auth.sub
  try{
    const deletedProduct = await OrderService.deleteOrder(req.params.id,userId);
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/checkout/success', async (req,res)=>{
  // res.set('Content-Type', 'text/html');
  // res.send(Buffer.from('<script>window.close();</script>'));
  
  // res.redirect('/orders')
  res.send("successful checkout ! .. you can close this tab now (hint:Ctrl + w)")
})

router.get('/checkout/cancel', async (req,res)=>{
  // res.set('Content-Type', 'text/html');
  // res.send(Buffer.from('<script>window.close();</script>'));
  
  // res.redirect('/orders')
  res.send("failed checkout ! .. you can close this tab now")
})

router.post('/stripe_webhook', express.raw({type: 'application/json'}), (request, response) => {
  try {
    OrderService.handleStripeEvent(request);  // Return a 200 response to acknowledge receipt of the event
    response.send();
  } catch (error) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;
