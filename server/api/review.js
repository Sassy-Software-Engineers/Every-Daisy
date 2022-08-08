const router = require('express').Router();
const { requireToken, isAdmin } = require('./middlewares');
const { models: { Product, Review, User } } = require('../db');

router.get('/:productId', async (req, res, next) => {
    try {
        const productReviews = await Review.findAll({
            where: {
              productId: req.params.productId
            },
            include : [User]
        })
        res.json(productReviews)
    } catch (error) {
        next(error)
    }
})


router.get('/:userId', requireToken, async (req, res, next) => {
    try {
        if (req.user.id === req.params.id) {
            const userReview = await Review.findAll({
                where: {
                    userId: req.user.id,
                },
                include: [Product]
            })
            res.json(userReview)
        } else res.status(403).send();
    } catch (error) {
        next(error)
    }
})


router.post('/:productId', requireToken, async (req, res, next) => {
    try {
        if (req.user.id === req.params.id) {
            const { title, starRating, content } = req.body;
            const user = req.user.id
            const newReview = await Review.create({ 
                title, starRating, content, user
            })
            res.json(newReview)
        } else res.status(403).send();
    } catch (error) {
        next(error)
    }
})

router.delete('/:productId', requireToken, async (req, res, next) => {
    try {
        if (req.user.id === req.params.id) {
            const review = await Review.findByPk(req.params.productId)
            await Review.destroy();
            res.json(review)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router
