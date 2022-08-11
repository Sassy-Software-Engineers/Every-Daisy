const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
  },
});

module.exports = User;
/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.prototype.getCartItems = async function () {
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

User.prototype.addCartItems = async function (product) {
  let cart = await this.getCartItems();
  let cartItem = cart.cartItems.find(
    (cartItem) => cartItem.productId === product.id
  );
  if (cartItem) {
    cartItem.quantity++;
    await cartItem.save();
  } else {
    await CartItem.create({
      productId: product.id,
      orderId: cart.id,
      quantity: 1,
      price: product.price,
    });
  }
  return this.getCartItems();
};

User.prototype.removeCartItems = async function (product) {
  let cart = await this.getCartItems();
  let cartItem = cart.cartItems.find(
    (cartItem) => cartItem.productId === product.id
  );
  if (cartItem.quantity > 1) {
    cartItem.quantity--;
    await cartItem.save();
  } else {
    await cartItem.destroy();
  }
  return this.getCartItems();
};

User.prototype.createOrder = async function () {
  let cart = await this.getCartItems();
  if (cart.cartItems.length > 0) {
    cart.status = 'PROCESSING';
    await cart.save();
  }
  return this.getCartItems();
};
/**
 * classMethods
 */
User.authenticate = async function ({ username, password, device }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  const cart = await user.getCartItems();
  const dUser = await this.findByDevice(device);
  if (dUser) {
    const dCart = await dUser.getCartItems();
    if (cart.cartItems.length < 1 && dCart.cartItems.length > 0) {
      await cart.destroy();
      await dCart.setUser(user);
    }
    else {
      const { cartItems } = dCart;
      for (let item of cartItems) {
        item.setOrder(cart);
      }
      await dCart.destroy();
    }
    await dUser.destroy();
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      return null;
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

User.findByDevice = async function (device) {
  try {
  const user = await this.findOne({
    where: {
      password: null,
      device
    }
  });
  if (!user) return null;
  return user;
  }
catch (ex) {
    const error = Error('bad cookie');
    error.status = 401;
    throw error;
  }
};

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
