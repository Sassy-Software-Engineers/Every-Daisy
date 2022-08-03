const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order',{
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        allowNull: false,
        defaultValue: 'PROCESSING',
        validate: {
            isIn: [['PROCESSING', 'SHIPPED', 'DELIVERED','ERROR']]
        },
    }

})

module.exports = Order