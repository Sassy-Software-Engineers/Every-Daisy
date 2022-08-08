import axios from 'axios';

const ADD_REVIEW = "ADD_REVIEW";


export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}


export const addNewReview = (review) => async (dispatch) => {
    try {
        const { data } = await axios.post('/api/review', review);
        dispatch(addReview(data));
    } catch (error) {
        console.error(error);
    }
}


export default function reviewReducer(state = [], action) {
    switch (action.type) {
        case ADD_REVIEW:
            return [...state, action.review]
        default:
            return state;
    }
}
