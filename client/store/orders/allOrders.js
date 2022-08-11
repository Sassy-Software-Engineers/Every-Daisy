import axios from 'axios';
import { COOKIE } from '../../components/Auth/Cookie';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
/**
 * ACTION CREATORS
 */
const setOrders = (orders) => ({
  type: GET_ORDERS,
  orders,
});
const addOrder = (order) => ({
  type: CREATE_ORDER,
  order,
});
const deletedOrder = (order) => ({
  type: DELETE_ORDER,
  order,
});
/**
 * THUNK CREATORS
 */
export const fetchOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const cookie = window.localStorage.getItem(COOKIE);
    const { data } = await axios.get('/api/orders', {
      headers: {
        authorization: token,
        device: cookie,
      },
    });
    dispatch(setOrders(data));
  };
};
export const createOrder = (order, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const cookie = window.localStorage.getItem(COOKIE);
    const { data } = await axios.post('/api/orders', order, {
      headers: {
        authorization: token,
        device: cookie,
      },
    });
    dispatch(addOrder(data));
    history.push('/');
  };
};
export const deleteOrder = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const cookie = window.localStorage.getItem(COOKIE);
    const { data } = await axios.delete(`/api/orders/${id}`, {
      headers: {
        authorization: token,
        device: cookie,
      },
    });
    dispatch(deletedOrder(data));
  };
};
/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case CREATE_ORDER:
      return [...state, action.order];
    case DELETE_ORDER:
      return state.filter((order) => order.id !== action.order.id);
    default:
      return state;
  }
}
