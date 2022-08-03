import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';
/**
 * ACTION CREATORS
 */
const setUser = (user) => ({
  type: GET_USER,
  user,
});
const updatedUser = (user) => ({
  type: UPDATE_USER,
  user,
});

/**
 * THUNK CREATORS
 */

export const fetchUser = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/users/${id}`);
    dispatch(setUser(data));
  };
};
export const updateUser = (user) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/users/${user.id}`, user);
    dispatch(updatedUser(data));
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case UPDATE_USER:
      return { ...action.user };
    default:
      return state;
  }
}
