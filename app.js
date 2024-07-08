const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const logger = require("./utils/logger");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

//middlewares
const pageNotFound = require("./middleware/not-found");
const errorHandle = require("./middleware/error-handler");

//routes
const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");
const stripeRouter = require("./routes/paymentRoutes");

const connectDB = require("./db/connect");

// Middleware setup
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// Logging middleware
app.use(morgan("tiny"));

// Body parsing middleware
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Static files middleware
app.use(express.static("./public"));

// Routes setup
app.get("/", (req, res) => {
  res.status(200).send("e-commerce api");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payment", stripeRouter);

// Error handling middleware
app.use(pageNotFound);
app.use(errorHandle);

// Server start
const port = process.env.PORT || 8000;
const startServer = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () => {
      logger.info(`Server listening on port ${port}...`);
    });
  } catch (error) {
    logger.error(`Error starting server: ${error.message}`);
  }
};

startServer();
