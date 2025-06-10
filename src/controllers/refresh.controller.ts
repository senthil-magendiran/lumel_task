import { Request, Response } from 'express';

import loadCSV from '../util/load-csv';
import { logRefresh } from '../util/logger';

export const refreshData = async (req: Request, res: Response) => {
  try {
    const { filePath } = req.body;
    await loadCSV(filePath);
    logRefresh(true);
    res.json({ message: 'Data refreshed successfully' });
  } catch (err: any) {
    console.error(err);
    logRefresh(false, err.message);
    res.status(500).json({ error: 'Failed to refresh data' });
  }
};