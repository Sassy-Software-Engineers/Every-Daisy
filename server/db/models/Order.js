const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'PENDING',
    validate: {
      isIn: [['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'ERROR']],
    },
  },
});

module.exports = Order;
