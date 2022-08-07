const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const { device, authorization } = req.headers;
    let user = await User.findByDevice(device);
    if (+authorization && !user) user = await User.findByToken(authorization);
    if (!user) user = User.create({ device });
    let cart = await user.getCartItems();
    res.json(cart);
  }
  catch (e) {
    next(e);
  }
});

router.post('/addCartItem', async (req, res, next) => {
  try {
    const { device, authorization } = req.headers;
    let user = await User.findByDevice(device);
    if (+authorization && !user) user = await User.findByToken(authorization);
    if (!user) user = User.create({ device });
    let newCart = await user.addCartItems(req.body);
    res.send(newCart);
  }
  catch (e) {
    next(e);
  }
});

router.post('/removeCartItem', async (req, res, next) => {
  try {
    const { device, authorization } = req.headers;
    let user = await User.findByDevice(device);
    if (+authorization && !user) user = await User.findByToken(authorization);
    let newCart = await user.removeCartItems(req.body);
    res.send(newCart);
  }
  catch (e) {
    next(e);
  }
});
