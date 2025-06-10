import loadCSV from './load-csv';
import { logRefresh } from './logger';

const refreshDataBackground = async () => {
  try {
    const filePath = './sample.csv';
    await loadCSV(filePath);
    logRefresh(true);
  } catch (err: any) {
    console.error('Background refresh failed:', err);
    logRefresh(false, err.message);
  }
};

export default refreshDataBackground;