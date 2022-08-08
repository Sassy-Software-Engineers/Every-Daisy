import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth/auth';
import singleProduct from './products/singleProduct';
import allProducts from './products/allProducts';
import singleUser from './user/singleUser';
import allUsers from './user/allUsers';
import cart from './cart/cart';
import allCategories from './categories/allCategories';
import allReviews from './reviews/reviews'

const reducer = combineReducers({
  auth,
  singleProduct,
  allProducts,
  singleUser,
  allUsers,
  cart,
  allCategories,
  allReviews,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth/auth';
