const router = require('express').Router();
const User = require('../db/models/User');
const Order = require('../db/models/Order');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'address', 'username']
    })
    res.json(users);
  } catch (error) {
    next(error)
  }
})

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.authenticate(req.body);
    const token = await user.generateToken();
    res.json(token); 
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    if (req.user) res.json(req.user)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orders', requireToken, async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.user.id
      }
    })
  } catch (error) {
    next(error)
  }
})

router.put("/:userId", async (req, res, next) => {
  try{
    const user = await User.findByPk(req.params.userId);
    const updated = await user.update(req.body);
    res.json(updated);
  } catch (error) {
    next(error)
  }
})

module.exports = router

