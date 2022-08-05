const router = require('express').Router();
const {
  models: { Product, Order, CartItem },
} = require('../db');
const requireToken = require('./middlewares')

// need a router.use in index for /cart

router.get('/:orderId', async (req, res, next) => {
    try {
      const cartItems = await CartItem.findAll({where: {
        orderId: req.params.orderId,
        },
        include: Order
    });
      res.json(cartItems);
    } catch (e) {
      next(e);
    }
  });

  router.post('/:productId', async (req, res, next) => {
    try {
      let product = await Product.findByPk(req.params.productId)
      const order = await Order.create(req.body);
      await order.addProduct(product.id, {through: {quantity: 1, price: product.price}})
      res.send(order);
    } catch (e) {
      next(e);
    }
  });

  router.put('/:orderId', async (req, res, next) => {
    // need this to recieve orderId and id of product to be able to update ?
    // well see
    try {
      const order = await Order.findByPk(req.params.orderId)

      res.json(updated);
    }
    catch (error) {
      next(error);
    }
  });

  router.delete('/products/:orderId', async (req, res, next) => {
    //this is to delete specific produts off of the cart, might need a separate if we want to delete whole cart
    // need this to recieve orderId and id of product to be able to delete 
    try {
      const order = await Order.findByPk(req.params.orderId)

      res.json(deleted);
    }
    catch (error) {
      next(error);
    }
  });