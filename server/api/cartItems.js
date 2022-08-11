const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { findRelevantUser } = require('./middlewares');
module.exports = router;

router.get('/', findRelevantUser, async (req, res, next) => {
  try {
    let cart = await req.user.getCartItems();
    res.json(cart);
  } catch (e) {
    next(e);
  }
});

router.post('/addCartItem', findRelevantUser, async (req, res, next) => {
  try {
    let newCart = await req.user.addCartItems(req.body);
    res.send(newCart);
  } catch (e) {
    next(e);
  }
});

router.post('/removeCartItem', findRelevantUser, async (req, res, next) => {
  try {
    let newCart = await req.user.removeCartItems(req.body);
    res.send(newCart);
  } catch (e) {
    next(e);
  }
});

router.post('/createOrder', findRelevantUser, async (req, res, next) => {
  try {
    let newOrder = await req.user.createOrder();
    res.send(newOrder)
  } catch (e) {
    next(e);
  }
});
