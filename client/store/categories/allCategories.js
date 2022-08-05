import axios from 'axios';

const GET_CATEGORIES = 'GET_CATEGORIES';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
/**
 * ACTION CREATORS
 */

const setCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

const addCategory = (category) => ({
  type: CREATE_CATEGORY,
  category,
});

const deletedCategory = (category) => ({
  type: DELETE_CATEGORY,
  category,
});
/**
 * THUNK CREATORS
 */

export const fetchCategories = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/categories');
    dispatch(setCategories(data));
  };
};
export const createCategory = (category, history) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/categories', category);
    dispatch(addCategory(data));
    history.push('/');
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/categories/${id}`);
    dispatch(deletedCategory(data));
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case CREATE_CATEGORY:
      return [...state, action.category];
    case DELETE_CATEGORY:
      return state.filter((category) => category.id !== action.category.id);
    default:
      return state;
  }
}
