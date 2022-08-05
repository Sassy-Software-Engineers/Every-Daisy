const Sequelize = require('sequelize');
const db = require('../db');


const CartItem = db.define('cart_item', {
    quantity: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
        },
    },
    price: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
});

module.exports = CartItem;