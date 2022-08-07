const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    let cart = await user.getCartItems();
    res.json(cart);
  } catch (e) {
    next(e);
  }
});

router.post('/addCartItem', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    let newCart = await user.addCartItems(req.body);
    res.send(newCart);
  } catch (e) {
    next(e);
  }
});

router.post('/removeCartItem', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    let newCart = await user.removeCartItems(req.body);
    res.send(newCart);
  } catch (error) {
    next(error);
  }
});
