import axios from 'axios'


/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

/**
 * ACTION CREATORS
 */
 const setProducts = (products) => ({
    type: GET_PRODUCTS,
    products,
  });
 const addProduct = (product) => ({
    type: CREATE_PRODUCT,
    product,
  });

/**
 * THUNK CREATORS
 */

export const fetchProducts = () => {
    return async (dispatch) => {
      const { data } = await axios.get('/api/products');
      dispatch(setProducts(data));
    };
  };
  export const createProduct = (product, history) => {
    return async (dispatch) => {
      const { data } = await axios.post('/api/products', product);
      dispatch(addProduct(data));
      history.push('/');
    };
  };


/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
