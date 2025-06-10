import fs from 'fs';
import { parse } from 'fast-csv';
import Order from '../models/orders.model';
import OrderItem from '../models/orderItem.model';

const loadCSV = async (filePath) => {
  const stream = fs.createReadStream(filePath);
  const csvStream = parse({ headers: true })
    .on('data', async (row) => {
      const order = {
        orderId: row['Order ID'],
        customerId: row['Customer ID'],
        date: new Date(row['Date of Sale']),
        shippingCost: parseFloat(row['Shipping Cost']),
        paymentMethod: row['Payment Method'],
        discount: parseFloat(row['Discount']) || 0,
      };

      const orderItem = {
        orderId: row['Order ID'],
        productId: row['Product ID'],
        region: row['Region'],
        quantity: parseInt(row['Quantity Sold']),
        unitPrice: parseFloat(row['Unit Price'])
      };

      await Order.updateOne({ orderId: order.orderId }, order, { upsert: true });
      await OrderItem.create(orderItem);
    })
    .on('end', () => {
      console.log('CSV processing complete');
    });

  stream.pipe(csvStream);
};

export default loadCSV;
