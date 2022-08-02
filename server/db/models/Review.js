const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('review', {
    starRating: {
        type: Sequelize.INTEGER,
        validate: {
        max: 5,
        min: 0
        }
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 50],
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            len: [20, 500],
        }
    }

})
