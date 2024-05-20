const Order = require("../models/Order");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

// const fakeStripeAPI = async ({ amount, currency }) => {
//   const client_secret = "someRandomValue";
//   return { client_secret, amount };
// };

const createOrder = async (req, res) => {
  const {
    items: cartItems,
    shippingFee,
    clientSecret,
    paymentIntentId,
  } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }
  const existingOrder = await Order.findOne({
    clientSecret,
    paymentIntentId,
  });

  if (existingOrder) {
    throw new CustomError.BadRequestError("Order already exists");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item._id });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(`No product with id : ${item._id}`);
    }
    const {
      name,
      price,
      image,
      _id,
      category,
      subcategory,
      material,
      size,
      genre,
      tags,
      condition,
      company,
      colors,
    } = dbProduct;
    const singleOrderItem = {
      quantity: item.quantity,
      name,
      price,
      image,
      product: _id,
      category,
      subcategory,
      material,
      size,
      genre,
      tags,
      condition,
      company,
      colors,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.quantity * price;
  }
  // calculate total
  const total = shippingFee + subtotal;

  if (total < 1000 && !shippingFee) {
    throw new CustomError.BadRequestError("Please provide shipping fee");
  }
  // get client secret
  // const paymentIntent = await fakeStripeAPI({
  //   amount: total,
  //   currency: "inr",
  // });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    shippingFee,
    clientSecret,
    paymentIntentId,
    user: req.user.userId,
    ...(clientSecret &&
      paymentIntentId && {
        status: "paid",
      }),
  });

  res.status(StatusCodes.CREATED).json({
    order,
    clientSecret: order.clientSecret,
    msg: "You placed an order",
  });
};
const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
