import axios from 'axios';
import history from '../../history';
import { COOKIE } from '../../components/User/Cookie';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const device = window.localStorage.getItem(COOKIE);
    const resp = { username, password, device };
    const res = await axios.post(`/auth/${method}`, resp);
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    history.push('/');
  }
  catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/');
  return {
    type: SET_AUTH,
    auth: {}
  };
};
/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
