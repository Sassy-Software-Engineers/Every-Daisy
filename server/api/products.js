const router = require('express').Router();
const {
  models: { Product, Review, Category },
} = require('../db');
module.exports = router;
//TODO: add requireToken middleware and req.user.isAdmin for post route

/*All products Route*/
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Review, Category],
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
      include: [Review, Category],
    });
    res.json(product);
  } catch (e) {
    next(e);
  }
});
/*add product - restricted to admin*/
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (e) {
    next(e);
  }
});
