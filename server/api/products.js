const router = require('express').Router();
const {
  models: { Product, Review, Category },
} = require('../db');
module.exports = router;
const { requireToken, isAdmin } = require('./middlewares');

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
//admin edit product
router.put('/:productId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    const updatedProduct = await product.update(req.body);
    res.send(updatedProduct);
  } catch (e) {
    next(e);
  }
});

/*add product - restricted to admin*/
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (e) {
    next(e);
  }
});
//review
router.post('/:productId', requireToken, async (req, res, next) => {
  try {
    const { title, content, starRating } = req.body;
    const user = req.user.id;
    const product = req.params.productId;
    const newReview = await Review.create({
      title,
      starRating,
      content,
    });
    newReview.setProduct(product);
    newReview.setUser(user);
    res.json(newReview);
  } catch (error) {
    next(error);
  }
});
