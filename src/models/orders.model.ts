import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: String,
  customerId: String,
  date: Date,
  shippingCost: Number,
  paymentMethod: String,
  discount: Number,
});

export default mongoose.model('Order', OrderSchema);