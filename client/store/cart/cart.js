import axios from 'axios';

const TOKEN = 'token';

export const fetchCart = () => async dispatch => {
    const token = window.localStorage.getStorage.getItem(TOKEN);
    const res = await axios.get('/api/cart', {
        headers: {
            authorization: token,
        }
    });
    return dispatch({type: 'SET_CART', cart: res.data });
};


export default function(state = {}, action) {
    switch (action.type) {
        case 'SET_CART':
            return action.cart;
        default:
            return state;
    }
}