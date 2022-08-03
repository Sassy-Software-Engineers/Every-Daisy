import axios from 'axios';

/**
 * ACTION TYPES
 */
// not sure where create_user will end up
const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';

/**
 * ACTION CREATORS
 */
const setUsers = (users) => ({
  type: GET_USERS,
  users,
});
const addUser = (user) => ({
  type: CREATE_USER,
  user,
});
const deletedUser = (user) => ({
  type: DELETE_USER,
  user,
});

/**
 * THUNK CREATORS
 */

export const fetchUsers = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/users');
    dispatch(setUsers(data));
  };
};
export const createUser = (user, history) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/users', user);
    dispatch(addUser(data));
    history.push('/');
  };
};
export const deleteUser = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/users/${id}`);
    dispatch(deletedUser(data));
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case CREATE_USER:
      return [...state, action.user];
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
}
