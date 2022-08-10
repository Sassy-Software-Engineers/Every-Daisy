const router = require('express').Router();
module.exports = router;
const { findRelevantUser } = require('./middlewares');
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const calculateOrderAmount = (cartItems) => {
  let dollarTotal = cartItems.reduce(
    (accum, cur) => accum + +cur.product.price * cur.quantity,
    0
  );
  return dollarTotal * 100;
};

router.post('/create-payment-intent', findRelevantUser, async (req, res) => {
  const user = req.user;
  console.log(user)
  const cartItems = await user.getCartItems();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cartItems),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send(paymentIntent.client_secret);
});
