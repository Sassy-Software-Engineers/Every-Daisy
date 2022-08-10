import axios from 'axios';
import { COOKIE } from '../../components/Auth/Cookie';

const TOKEN = 'token';
/**
 * ACTION TYPES
 */
const GET_SECRET = 'GET_SECRET';

/**
 * ACTION CREATORS
 */
const setSecret = (secret) => ({
  type: GET_SECRET,
  secret,
});

/**
 * THUNK CREATORS
 */

export const fetchSecret = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    const cookie = window.localStorage.getItem(COOKIE);
    const { data } = await axios.post(
      '/api/checkout/create-payment-intent',
      null,
      {
        headers: {
          authorization: token,
          device: cookie,
        },
      }
    );
    dispatch(setSecret(data));
  };
};

/**
 * REDUCER
 */
export default function (state = '', action) {
  switch (action.type) {
    case GET_SECRET:
      return action.secret;
    default:
      return state;
  }
}
