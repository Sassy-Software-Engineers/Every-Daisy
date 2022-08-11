const express = require('express');
const router = express.Router();
const { models: { User, Order, Product, CartItem } } = require('../db');
const { requireToken, isAdmin, findRelevantUser } = require('./middlewares');

router.post('/', requireToken, isAdmin, async (req, res, next) => {
    try {
        const order = await Order.create(req.body);
        res.json(order);
    }
    catch (e) { next(e) }
});

router.get('/', requireToken, isAdmin, async (req, res, next) => {
    try {
        const orders = await Order
            .findAll({
                include: {
                    model: User,
                    as: 'user',
                    attributes: ['username']
                }
            });
        res.json(orders);
    }
    catch (e) { next(e) }
});

router.get('/:orderId', requireToken, async (req, res, next) => {
    try {
        if (isNaN(+req.params.orderId)) res.status(400).send('Invalid Order ID');
        else {
            const order = await Order.findByPk(req.params.orderId);
            return res.json(await order.itemized());
        }
    }
    catch (e) { next(e) }
});

router.put('/:orderId', requireToken, isAdmin, async (req, res, next) => {
    try {
        if (isNaN(+req.params.orderId)) res.status(400).send('Invalid Order ID');
        else {
            const order = await Order.findByPk(req.params.orderId);
            res.json(await order.update(req.body));
        }
    }
    catch (e) { next(e) }
});

router.delete('/:orderId', requireToken, isAdmin, async (req, res, next) => {
    try {
        if (isNaN(+req.params.orderId)) res.status(400).send('Invalid Order ID');
        else {
            const order = await Order.findByPk(req.params.orderId);
            const { cartItems } = await order.itemized();
            for (let item of cartItems) await item.destroy();
            const baleeted = await order.destroy();
            if (baleeted) res.sendStatus(204);
            else res.status(404).send('Order Not Found!');
        }
    }
    catch (e) { next(e) }
});

module.exports = router;