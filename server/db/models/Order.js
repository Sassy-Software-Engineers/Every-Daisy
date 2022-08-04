const Sequelize = require('sequelize');
const db = require('../db');

//order model can be cart 
//order is cart applying payment method to it 
//have a cart status
const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'PROCESSING',
    validate: {
      isIn: [['PROCESSING', 'SHIPPED', 'DELIVERED', 'ERROR']],
    },
  },
});

module.exports = Order;
