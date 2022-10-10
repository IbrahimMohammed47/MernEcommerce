const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  imageUrl: String,
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true
  },
},{
  timestamps: true
});
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
