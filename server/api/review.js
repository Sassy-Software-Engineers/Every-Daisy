const router = require('express').Router();
const { requireToken, isAdmin } = require('./middlewares');
const { models: { Product, Review, User } } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            include: [ 
                { model: User } 
            ]
        })
        res.json(reviews)
    } catch (error) {
        next(error)
    }
})

router.get('/:userId', requireToken, async (req, res, next) => {
    try {
        if (req.user.id === req.params.id) {

        }

    } catch (error) {
        next(error)
    }
})

router.get('/:productId', requireToken, async (req, res, next) => {})

router.post('/', requireToken, async (req, res, next) => {})

module.exports = router
