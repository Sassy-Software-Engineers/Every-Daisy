import axios from 'axios';

const ADD_REVIEW = "ADD_REVIEW";
const GET_REVIEWS = "GET_REVIEWS";


export const getReviews = (allReviews) => {
    return {
        type: GET_REVIEWS,
        allReviews
    }
}
export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}


export const fetchReviews = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/review');
        dispatch(addReview(data));
    } catch (error) {
        console.error(error);
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
        case GET_REVIEWS:
            return action.allReviews
        case ADD_REVIEW:
            return [...state, action.review]
        default:
            return state;
    }
}
