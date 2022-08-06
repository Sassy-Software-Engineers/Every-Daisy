const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
Category.prototype.addProduct = function () {
  this.addProduct(productId);
};

module.exports = Category;
