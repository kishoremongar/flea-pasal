const { createLogger, format, transports } = require("winston");

require("winston-mongodb");
require("dotenv/config");

module.exports = createLogger({
  transports: [
    new transports.File({
      filename: "all_logs.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.MongoDB({
      level: "error",
      db: process.env.DB_URL,
      options: {
        useUnifiedTopology: true,
      },
      collection: "application_logs",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      format: format.combine(
        format.label({
          label: `Label ➡️`,
        }),
        format.timestamp({
          format: "MMM-DD-YYYY HH:mm:ss",
        }),
        format.printf(
          (info) =>
            `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});
