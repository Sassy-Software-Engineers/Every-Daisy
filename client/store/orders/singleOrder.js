import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';
const CHANGE_STATUS = 'CHANGE_STATUS';
/**
 * ACTION CREATORS
 */

const setOrder = (order) => ({
    type: GET_ORDER,
    order,
});

const updatedOrder = (order) => ({
    type: UPDATE_ORDER,
    order,
});

const _changeStatus = (order, status) => ({
    type: CHANGE_STATUS,
    order,
});

/**
 * THUNK CREATORS
 */

export const fetchOrder = (id) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/api/orders/${id}`);
        dispatch(setOrder(data));
    };
};

export const updateOrder = (order) => {
    return async (dispatch) => {
        const { data } = await axios.put(`/api/orders/${order.id}`, order);
        dispatch(updatedOrder(data));
    };
};

export const changeStatus = (order, status) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`/api/orders/${order.id}`, { status });
            dispatch(_changeStatus(data));
        }
        catch (e) { throw new Error(e) }
    };
};

/**
 * REDUCER
 */
export default function(state = {}, action) {
    switch (action.type) {
        case GET_ORDER:
            return action.order;
        case UPDATE_ORDER:
            return { ...action.order };
        case CHANGE_STATUS:
            return { ...action.order };
        default:
            return state;
    }
}
