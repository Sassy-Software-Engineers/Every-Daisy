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

Order.belongsToMany(Product, { through: 'cart_item' });
Product.belongsToMany(Order, { through: 'cart_item' });

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
//we should be importing the models in any other files dependent on associations from here by requiring const {models: {User, Product, Review, Order, Category, CartItem}} = require..... etc.
