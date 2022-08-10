import axios from 'axios';

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
    const { data } = await axios.get('/api/orders');
    dispatch(setOrders(data));
  };
};
export const createOrder = (order, history) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/orders', order);
    dispatch(addOrder(data));
    history.push('/');
  };
};
export const deleteOrder = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/orders/${id}`);
    dispatch(deletedOrder(data));
  };
};
/**
 * REDUCER
 */

export default function(state = [], action) {
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