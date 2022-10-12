const express = require('express');
const mongoose = require('mongoose');
const { auth, requiresAuth } = require('express-openid-connect');
const productsRouter = require('./products/router.js');
const ordersRouter = require('./orders/router.js');

require('dotenv').config()

async function main() {
  
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Database connected successfully`);
  
  const app = express();
  const port = process.env.PORT || 5000;

  app.get('/',(req,res)=>{
    res.send("MERN E-COMMERCE")
  })
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
  app.use((req, res, next) => {
    if (req.originalUrl === '/api/orders/stripe_webhook') {
      next();
    } else {
      express.json()(req, res, next);
    }
  });
  // app.use(express.json());
  
  app.use(auth({
    authRequired: false, 
    auth0Logout: true,
    clientID: process.env.AUTH0_CLIENT_ID,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    issuerBaseURL: process.env.AUTH0_SERVER,
  }));


  // app.use('/api/products', requiresAuth(),productsRouter);
  app.use('/api/products',productsRouter);
  app.use('/api/orders',ordersRouter);
  
  // app.get('/tmp', (req,res)=>{
  //   console.log(req.headers)
  //   console.log(req.oidc.user);
  //   res.send('ok');
  // })

  app.use((err, req, res, next) => {
    console.log(err);
    next();
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

}

main().catch(err => console.log(err));
