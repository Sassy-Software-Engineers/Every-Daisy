const Sequelize = require('sequelize');
const db = require('../db');
const CartItem = require('./CartItem');
const Product = require('./Product');
const User = require('./User');

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
  const order = await Order.findByPk(this.id, {
    include: {
      model: CartItem,
      include: { model: Product }
    },
  });
  order.total = await order.getTotal();
  return order;
};

Order.prototype.getTotal = async function() {
  const items = await CartItem.findAll({where: {orderId: this.id}});
  let total = 0;
  for (let item of items) {
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
