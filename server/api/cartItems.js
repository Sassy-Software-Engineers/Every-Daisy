const router = require('express').Router();
const {
  models: { Product, Order, CartItem },
} = require('../db');
const requireToken = require('./middlewares')

router.get('/', async (req, res, next) => {
    try {
      const cartItems = await CartItem.findAll({
        include: [Product,Order],
      });
  
      res.json(cartItems);
    } catch (e) {
      next(e);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const order = await Order.create(req.body);
      res.send(order);
    } catch (e) {
      next(e);
    }
  });

  router.put('/', async (req, res, next) => {
    try {
      const cartItems = await CartItem.findAll({where: {
        orderId: req.params.orderId,
        },
        include: Order
    });
      const updated = await cartItems.update(req.body);
      res.json(updated);
    }
    catch (error) {
      next(error);
    }
  });