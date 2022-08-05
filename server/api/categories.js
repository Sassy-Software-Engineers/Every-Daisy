const router = require('express').Router();
const { models: { Product, Category, Review } } = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const categories = await Category.findAll({});
        res.json(categories)
    } catch (error) {
      next(error);
    }
});

module.exports = router;
