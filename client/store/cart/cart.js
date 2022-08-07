import axios from 'axios';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_CART = 'SET_CART';

/**
 * ACTION CREATORS
 */
const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

/**
 * THUNK CREATORS
 */
export const fetchCart = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data } = await axios.get('/api/cart', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setCart(data));
  } catch (err) {
    console.error(err);
  }
};

export const setCartAdd = (product) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data } = await axios.post('/api/cart/addCartItem', product, {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setCart(data));
  } catch (err) {
    console.error(err);
  }
};

export const setCartRemove = (product) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data } = await axios.post('/api/cart/removeCartItem', product, {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setCart(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_CART':
      return action.cart;
    default:
      return state;
  }
}
