import axios from 'axios';

const TOKEN = 'token';

//Action Type
const ADD_TO_CART = "ADD_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART"; 


//Action Creator
const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        product
    }
}

const deleteFromCart = (product) => {
    return {
        type: DELETE_FROM_CART,
        product
    }
}


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
        const { data } = await axios.post('/api/cart', product);
        dispatch(addToCart(data));
    } catch (error) {
        console.error(error)
    }
}


export default function(state = {}, action) {
    switch (action.type) {
        case 'SET_CART':
            return action.cart;
const ADD_TO_CART = "ADD_CART";
        case 'ADD_TO_CART': 
            return action.product
        default:
            return state;
    }
}