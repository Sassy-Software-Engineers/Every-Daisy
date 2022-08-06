const User = require('../db/models/User');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    console.log('USER IS ADMIN', user.isAdmin);
    if (user.isAdmin) {
      next();
      return;
    }
    res.status(403).send('Require Admin Role');
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken, isAdmin };
