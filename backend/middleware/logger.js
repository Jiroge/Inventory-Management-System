const winston = require("winston");
const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const getThailandTime = () => {
  const thailandTime = new Intl.DateTimeFormat("en-TH", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
  return thailandTime.replace(",", ""); // Remove comma if present
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: getThailandTime }), // Use custom Thailand time formatter
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} -- ${level.toUpperCase()} -- ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(
        logDir,
        `${new Date().toISOString().split("T")[0]}-log.txt`
      ),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

module.exports = (req, res, next) => {
  const originalUrl = req.originalUrl;
  const method = req.method;

  const urlParts = originalUrl.split("/");
  const editorIndex = urlParts.indexOf("items") + 1;
  const editor =
    editorIndex < urlParts.length ? urlParts[editorIndex] : "Unknown";

  // console.log("urlParts", urlParts);
  // console.log("editor", editor);
  
  if (originalUrl.includes("/v1/api/items/")) {
    switch (method) {
      case "GET":
        logger.info(`Search Process -- ${editor} -- Searched items`);
        break;
      case "POST":
        logger.info(`Create Process -- ${editor} -- Created new item`);
        break;
      case "PUT":
        logger.info(`Edit Process -- ${editor} -- Edited item`);
        break;
      case "DELETE":
        logger.info(`Delete Process -- ${editor} -- Deleted item`);
        break;
    }
  }

  next();
};
