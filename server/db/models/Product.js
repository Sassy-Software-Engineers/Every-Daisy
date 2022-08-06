const Sequelize = require('sequelize');
const db = require('../db');
const { TEXT, INTEGER, STRING, DECIMAL } = Sequelize;
/*Must have title, description, price, and inventory quantity
Must belong to at least one category
If there is no photo, there must be a placeholder photo used*/
const Product = db.define('product', {
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DECIMAL(6, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    type: INTEGER,
    validate: {
      min: 0,
    },
  },
  image: {
    type: STRING,
    defaultValue:
      'https://st.depositphotos.com/1055085/3389/i/600/depositphotos_33897773-stock-photo-artificial-tree.jpg',
  },
});

module.exports = Product;
