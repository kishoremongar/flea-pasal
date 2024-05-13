module.exports = {
  // host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  secure: false, // use SSL
  // maxConnections: 3,
  // pool: true,
  // connectionTimeout: 10000,
  // greetingTimeout: 5000,
  // socketTimeout: 5000,
  // logger: false,
  // debug: false,
};

//Etheral
// module.exports = {
//   host: 'smtp.ethereal.email',
//   port: 587,
//   auth: {
//     user: 'dale.stamm@ethereal.email',
//     pass: 'Uegzgeh8N9fj7Pcu8k',
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
//   secure: false, // use SSL
// };
