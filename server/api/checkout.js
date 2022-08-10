const router = require('express').Router();
module.exports = router;
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const calculateOrderAmount = (cartItems) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  //must return total in pennies
  let dollarTotal = cartItems.reduce(
    (accum, cur) => accum + +cur.product.price * cur.quantity,
    0
  );
  return dollarTotal * 100;
};

router.get('/secret', async (req, res) => {
  const intent = // ... Fetch or create the PaymentIntent
    res.json({ client_secret: intent.client_secret });
});

router.post('/create-payment-intent', async (req, res) => {
  const { cartItems } = req.body;
  //TODO - need to set up axios route to getCartItems

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// app.listen(4242, () => console.log('Node server listening on port 4242!'));
