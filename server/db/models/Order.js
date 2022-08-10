const Sequelize = require('sequelize');
const db = require('../db');
const CartItem = require('./CartItem');
const Product = require('./Product');

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  status: {
    type: Sequelize.ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'ERROR'),
    allowNull: false,
    defaultValue: 'PENDING',
  },
});

module.exports = Order;

Order.prototype.itemized = async function() {
  return await Order.findByPk(this.id, {
    include: {
      model: CartItem,
      include: { model: Product }
    },
  });
};

Order.prototype.getTotal = async function() {
  const receipt = await this.itemized();
  let total = 0;
  for (let item of receipt.cartItems) {
    total += item.price * item.quantity;
  }
  return total;
};

Order.findByUser = async function(userId) {
  return await Order.findAll({ where: { userId } });
};

Order.findByStatus = async function(status) {
  return await Order.findAll({ where: { status } });
};
