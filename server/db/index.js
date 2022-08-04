//this is the access point for all things database related!

const db = require('./db');
const User = require('./models/User');
const Product = require('./models/Product');
const Review = require('./models/Review');
const Order = require('./models/Order');
const Category = require('./models/Category');

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Review.belongsTo(Product);
Product.hasMany(Review);

Category.belongsToMany(Product, { through: 'product_categories' });
Product.belongsToMany(Category, { through: 'product_categories' });

//TODO: order and product many to many relation

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    Review,
    Category,
  },
};
