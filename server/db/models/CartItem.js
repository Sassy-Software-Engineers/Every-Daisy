const Sequelize = require('sequelize');
const db = require('../db');

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  /**
   * Removed b/c should refer to product.price - Prof video's model matches this, but can revisit later
   */

  // price: {
  //   type: Sequelize.DECIMAL(6, 2),
  //   // allowNull: false,
  //   // validate: {
  //   //   notEmpty: true,
  //   // },
  // },
});

module.exports = CartItem;
