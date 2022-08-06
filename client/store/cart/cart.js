import axios from 'axios';

const TOKEN = 'token';

//thunk
export const fetchCart = () => async dispatch => {
    const token = window.localStorage.getStorage.getItem(TOKEN);
    const res = await axios.get('/api/cart', {
        headers: {
            authorization: token,
        }
    });
    return dispatch({type: 'SET_CART', cart: res.data });
};

export const setCartAdd = (product) => async (dispatch) => {
    try {
        const token = window.localStorage.getStorage.getItem(TOKEN);
        const res = await axios.post('/api/cart/addToCart', product, 
        {
            headers: {
                authorization: token,
            }
        });
        return dispatch({type: 'SET_CART', cart: res.data });
    } catch (error) {
        console.error(error)
    }
};

export const setCartRemove = (product) => async (dispatch) => {
    try {
        const token = window.localStorage.getStorage.getItem(TOKEN);
        const res = await axios.post('/api/cart/removeFromCart', product, 
        {
            headers: {
                authorization: token,
            }
        });
        return dispatch({type: 'SET_CART', cart: res.data });
    } catch (error) {
        console.error(error)
    }
}


export default function(state = {}, action) {
    switch (action.type) {
        case 'SET_CART':
            return action.cart;
        default:
            return state;
    }
}