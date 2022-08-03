import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

/**
 * ACTION CREATORS
 */
const setProduct = (product) => ({
  type: GET_PRODUCT,
  product,
});
const updatedProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

/**
 * THUNK CREATORS
 */

export const fetchProduct = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
  };
};
export const updateProduct = (product) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/products/${product.id}`, product);
    dispatch(updatedProduct(data));
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return { ...action.product };
    default:
      return state;
  }
}
