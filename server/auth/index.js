const router = require('express').Router()
const { models: { User } } = require('../db')
const { signup } = require('../api/middlewares');
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  }
  catch (err) {
    next(err)
  }
})

router.post('/signup', signup, async (req, res, next) => {
  try {
    res.send({ token: await req.user.generateToken() })
  }
  catch (err) { next(err) }
})

router.get('/me', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    user.cart = user.getCartItems();
    res.send(user);
  }
  catch (ex) {
    next(ex)
  }
})
