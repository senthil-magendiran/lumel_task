import fs from 'fs';

export const logRefresh = (success, message = '') => {
    const log = `${new Date().toISOString()} - Refresh ${success ? 'Success' : 'Failure'}${message ? ': ' + message : ''}\n`;
    fs.appendFileSync('refresh.log', log);
};