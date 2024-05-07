const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

//middlewares
const pageNotFound = require("./middleware/not-found");
const errorHandle = require("./middleware/error-handler");

//routes
const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

const connectDB = require("./db/connect");

// const corsOptions = {
//   origin: ['*'], // Add your frontend URLs here
//   credentials: true, // Allow cookies and headers to be sent from frontend
//   optionsSuccessStatus: 204,
// };

app.use(morgan("tiny"));

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// app.use(cors(corsOptions));
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.status(200).send("e-commerce api");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

app.use(pageNotFound);
app.use(errorHandle);

const port = process.env.PORT || 8000;
const startServer = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, "0.0.0.0", () => {
      console.log(`new server listening in ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
