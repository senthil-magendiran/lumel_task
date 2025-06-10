import { Request, Response } from 'express';

import OrderItem from '../models/orderItem.model';

export const getRevenue = async (req: Request, res: Response) => {
  const { from, to, category, region, product } = req.query;
  try {
    const matchStage = {
      ...(from && to && { date: { $gte: new Date(from), $lte: new Date(to) } }),
      ...(region && { region }),
      ...(product && { productId: product })
    };

    const result = await OrderItem.aggregate([
      { $match: matchStage },
      { $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ['$quantity', '$unitPrice'] } }
        }
      }
    ]);

    res.json({ totalRevenue: result[0]?.totalRevenue || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to calculate revenue' });
  }
};