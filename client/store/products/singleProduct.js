import axios from 'axios';

const TOKEN = 'token';
/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const ADD_REVIEW = 'ADD_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
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
const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});
const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
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
  const token = window.localStorage.getItem(TOKEN);

  return async (dispatch) => {
    const { data } = await axios.put(`/api/products/${product.id}`, product, {
      headers: { authorization: token },
    });
    dispatch(updatedProduct(data));
  };
};
export const addNewReview = (productId, review) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.post(`/api/products/${productId}`, review, {
        headers: {
          authorization: token,
        },
      });
      dispatch(addReview(data));
    } catch (error) {
      console.error(error);
    }
  };
};
/*
// export const removeReview = (productId, review) => {
//   return async (dispatch) => {
//     try {
//       const token = window.localStorage.getItem(TOKEN);
//       const { data } = await axios.delete(
//         `/api/products/${productId}`,
//         review,
//         {
//           headers: {
//             authorization: token,
//           },
//         }
//       );
//       console.log('data from axios delete review', data);
//       dispatch(deleteReview(data));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return { ...action.product };
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, action.review] };
    // case DELETE_REVIEW:
    //   return state.reviews.filter((review) => review.id !== action.review.id);
    default:
      return state;
  }
}
