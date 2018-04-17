/* global fetch */
import fetchHelper from '../../modules/fetchHelper';
import * as cookie from '../../modules/cookie';

export const WAITING = 'data/auth/WAITING';
export const SUCCESS = 'data/auth/SUCCESS';
export const FAILURE = 'data/auth/FAILURE';

const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = (account) => {
  return {
    type: SUCCESS,
    account,
  };
};
const failure = (error) => {
  return {
    type: FAILURE,
    error,
  };
};
export const request = () => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await fetchHelper({
        path: '/api/account',
        options: {
          autoAuth: true,
        },
      });
      const { account } = data;
      return dispatch(success(account));
    } catch (error) {
      cookie.remove('token');
      return dispatch(failure(error));
    }
  };
};
export const logout = () => {
  return (dispatch) => {
    cookie.remove('token');
    return dispatch(failure({ message: '로그아웃' }));
  };
};
