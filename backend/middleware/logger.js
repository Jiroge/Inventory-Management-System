const winston = require('winston');
const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} -- ${level.toUpperCase()} -- ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, `${new Date().toISOString().split('T')[0]}-log.txt`),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

module.exports = (req, res, next) => {
  const originalUrl = req.originalUrl;
  const method = req.method;
  const editor = req.body.editor || 'Unknown';

  if (originalUrl.includes('/api/items')) {
    switch (method) {
      case 'GET':
        logger.info(`Search Process -- ${editor} -- Searched items`);
        break;
      case 'POST':
        logger.info(`Create Process -- ${editor} -- Created new item`);
        break;
      case 'PUT':
        logger.info(`Edit Process -- ${editor} -- Edited item`);
        break;
      case 'DELETE':
        logger.info(`Delete Process -- ${editor} -- Deleted item`);
        break;
    }
  }

  next();
};