const express = require('express');
const router = express.Router();
const ProductService = require('./service.js');

router.get('/', async (req, res) => {
  const page = req.query.page
  const products = await ProductService.getProducts({},page);
  res.status(200).json(products);
});

router.post('/', async (req, res) => {
  try {
    const createdProduct = await ProductService.createProduct(req.body);
    res.status(200).json(createdProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await ProductService.updateProduct({_id:req.params.id}, req.body);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try{
    const deletedProduct = await ProductService.deleteProduct(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
