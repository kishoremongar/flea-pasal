const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");
const logger = require("../utils/logger");

const sendEmail = async ({ to, subject, html }) => {
  //   let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  logger.info(`Email sent to ${to}`);
  return transporter.sendMail({
    // from: process.env.EMAIL_USER,
    from: `Flea Pasal <fushiginashinobi@gmail.com>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
