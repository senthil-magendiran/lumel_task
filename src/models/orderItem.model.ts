import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  orderId: String,
  productId: String,
  region: String,
  quantity: Number,
  unitPrice: Number,
});

export default mongoose.model('OrderItem', OrderItemSchema);