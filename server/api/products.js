const router = require('express').Router();
const {
  models: { Product, Review, Category },
} = require('../db');
module.exports = router;

/*All products Route*/
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Review,
          as: 'reviews',
        },
        {
          model: Category,
          as: 'category',
        },
      ],
    });

    res.json(products);
  } catch (e) {
    next(e);
  }
});
/*Single Product Route*/
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [
        {
          model: Review,
          as: 'reviews',
        },
        {
          model: Category,
          as: 'category',
        },
      ],
    });
    res.json(product);
  } catch (e) {
    next(e);
  }
});
