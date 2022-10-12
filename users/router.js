const express = require('express');
const router = express.Router();

// router.get('/', async (req, res) => {
//   const products = await ProductService.getProducts();
//   res.status(200).json(products);
// });

router.patch('/:id', async (req, res) => {
  try {
    const updatedProduct = await ProductService.updateProduct({_id:req.params.id}, req.body);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.delete('/:id', async (req, res, next) => {
//   try{
//     const deletedProduct = await ProductService.deleteProduct(req.params.id);
//     res.status(200).json(deletedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
