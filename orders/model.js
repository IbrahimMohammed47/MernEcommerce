const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  userId: { type: String, required: true },
  purchases: [
    {
      qty: { type: Number, required: true, default: 0 },
      name: String,
      currPrice: {type: Number, required: true},
      currStock: {type: Number, required: true},
			product: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'Product',
			},          
    },
  ],
  status: { 
    type: String, 
    enum : ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING' 
  },
  totalPrice:{
    type : Number,
    required: true,
    default: 0
  },
  stripePaymentId: String,
  stripePaymentUrl: String
},{
  timestamps: true,
});
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
