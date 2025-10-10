import { Logger } from 'commandkit';
import fs from 'fs';
import path from 'path';

const logDir = path.join(__dirname, '../../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const logFile = path.join(logDir, 'bot.log');

if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, '');
}

export function log(message: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile(logFile, logMessage, 'utf-8', (err) => {
    if (err) {
      console.error('Failed to write log:', err);
    }
  });
  Logger.log(logMessage.trim());
}
