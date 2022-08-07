const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Product = require('./Product');
const CartItem = require('./CartItem');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  device: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
});

module.exports = User;
/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function() {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.prototype.getCartItems = async function() {
  let cart = await Order.findOne({
    where: { userId: this.id, status: 'PENDING' },
  });
  if (!cart)
    cart = await Order.create({
      userId: this.id,
      status: 'PENDING',
    });
  return await Order.findByPk(cart.id, {
    include: [{ model: CartItem, include: [Product] }],
  });
};

User.prototype.addCartItems = async function(product) {
  let cart = await this.getCartItems();
  let cartItem = cart.cartItems.find(
    (cartItem) => cartItem.productId === product.id
  );
  if (cartItem) {
    cartItem.quantity++;
    await cartItem.save();
  }
  else {
    await CartItem.create({
      productId: product.id,
      orderId: cart.id,
      quantity: 1,
      price: product.price,
    });
  }
  return this.getCartItems();
};

User.prototype.removeCartItems = async function(product) {
  let cart = await this.getCartItems();
  let cartItem = cart.cartItems.find(
    (cartItem) => cartItem.productId === product.id
  );
  if (cartItem.quantity > 1) {
    cartItem.quantity--;
    await cartItem.save();
  }
  else {
    await cartItem.destroy();
  }
  return this.getCartItems();
};
/**
 * classMethods
 */
User.authenticate = async function({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw 'nooo';
    }
    return user;
  }
  catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

User.findByDevice = async function(device) {
  try {
    const user = User.findOne({ where: { device } });
    if (!user) {
      throw 'oops';
    }
    return user;
  }
  catch (ex) {
    const error = Error('bad cookie');
    error.status = 401;
    throw error;
  }
}

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
