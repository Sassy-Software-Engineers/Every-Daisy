const User = require('../db/models/User');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  }
  catch (error) {
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
  }
  catch (error) {
    next(error);
  }
};

const findRelevantUser = async (req, res, next) => {
  try {
    const { device, authorization } = req.headers;
    try {
      const user = await User.findByToken(authorization);
      req.user = user;
    }
    catch (ex) {
      let user = await User.findByDevice(device);
      if (!user) user = await User.create({ device });
      req.user = user;
    }
    next();
  }
  catch (error) { next(error) }
};

const signup = async (req, res, next) => {
  try {
    const { device, username, password } = req.body;
    const user = await User.findByDevice(device);
    if (!user) req.user = await User.create(req.body);
    else req.user = await user.update({ username, password });
    next();
  }
  catch (error) { next(error) }
};

module.exports = { requireToken, isAdmin, findRelevantUser, signup };
