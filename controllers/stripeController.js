const stripe = require('stripe')(process.env.STRIPE_KEY);
const Product = require('../models/Product');
const CustomError = require('../errors');

const stripeController = async (req, res) => {
  const { purchase, total_amount: clientTotalAmount, shipping_fee } = req.body;
  const clientTotalWithShipping = Number(
    (clientTotalAmount + shipping_fee).toFixed(2)
  );
  const calculateOrderAmount = async (purchase) => {
    try {
      let total_amount = 0;
      const productDetails = await Promise.all(
        purchase.map(async (item) => {
          const product = await Product.findOne({ _id: item._id });
          return {
            price: product.price,
            quantity: item.quantity,
          };
        })
      );

      // Calculate the total amount based on product prices and quantities
      total_amount = productDetails.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);

      // Add any additional fees (e.g., shipping fee)
      total_amount += shipping_fee;

      return Number(total_amount.toFixed(2));
    } catch (error) {
      throw new CustomError.BadRequestError(
        `Error calculating order amount:: ${clientTotalAmount}`
      );
    }
  };

  const serverTotalAmount = await calculateOrderAmount(purchase);
  if (serverTotalAmount !== clientTotalWithShipping) {
    throw new CustomError.BadRequestError(
      `Invalid total amount: ${clientTotalWithShipping}`
    );
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(serverTotalAmount * 100),
    currency: 'inr',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
