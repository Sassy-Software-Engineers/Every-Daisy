const router = require('express').Router();
const User = require('../db/models/User');
const Order = require('../db/models/Order');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'address']
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'address'],
      include: { model: Order}
    });
    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router

