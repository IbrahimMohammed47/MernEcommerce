const express = require('express');
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose');
// const { auth, requiresAuth } = require('express-openid-connect');
const productsRouter = require('./products/router.js');
const ordersRouter = require('./orders/router.js');
const usersRouter = require('./users/router.js');

require('dotenv').config()

async function main() {
  
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Database connected successfully`);
  
  const app = express();
  const port = process.env.PORT || 5000;

  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.use(cors());
    
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.originalUrl === '/api/orders/stripe_webhook') {
      next();
    } else {
      express.json()(req, res, next);
    }
  });

  app.use('/api/products',productsRouter);
  app.use('/api/orders',ordersRouter);
  app.use('/api/users',usersRouter);

  app.use((err, req, res, next)=> {
    console.log(err)
    switch(err.name){
      case 'UnauthorizedError':
        res.status(401).send(`unauthorized: ${err.code}`); break;

      default:
        res.status(500).send('internal server error');
    }

  });

  app.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname+'/client/build/index.html'));
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

}

main().catch(err => console.log(err));
