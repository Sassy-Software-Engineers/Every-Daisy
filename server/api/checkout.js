const router = require('express').Router();
module.exports = router;
const { findRelevantUser } = require('./middlewares');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const calculateOrderAmount = (cartItems) => {
  let dollarTotal = cartItems.reduce(
    (accum, cur) => accum + +cur.product.price * cur.quantity,
    0
  );
  return (dollarTotal * 100).toFixed(0);
};

router.post(
  '/create-payment-intent',
  findRelevantUser,
  async (req, res, next) => {
    try {
      const user = req.user;

      const data = await user.getCartItems();
      if (!data.cartItems.length) {
        res.sendStatus(204);
        return;
      }
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(data.dataValues.cartItems),
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send(paymentIntent.client_secret);
    } catch (err) {
      next(err);
    }
  }
);
