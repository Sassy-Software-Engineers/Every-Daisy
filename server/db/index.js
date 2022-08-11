//this is the access point for all things database related!

const db = require('./db'); //database
const User = require('./models/User');
const Product = require('./models/Product');
const Review = require('./models/Review');
const Order = require('./models/Order');
const Category = require('./models/Category');
const CartItem = require('./models/CartItem');

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Review.belongsTo(Product);
Product.hasMany(Review);

Category.belongsToMany(Product, { through: 'product_categories' });
Product.belongsToMany(Category, { through: 'product_categories' });

CartItem.belongsTo(Product);
CartItem.belongsTo(Order);
Order.hasMany(CartItem);

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    Review,
    Category,
    CartItem,
  },
};
