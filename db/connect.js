const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      logger.info("MongoDB Connected");
    })
    .catch((err) => {
      logger.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
