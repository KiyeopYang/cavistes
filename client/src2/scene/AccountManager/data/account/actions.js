/* global fetch */
import config from '../../../../config';
import * as cookie from '../../../../modules/cookie';
import loader from '../../../../data/loader/actions';

export const WAITING = 'AccountManager/data/account/WAITING';
export const SUCCESS = 'AccountManager/data/account/SUCCESS';
export const FAILURE = 'AccountManager/data/account/FAILURE';

const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = (accounts) => {
  return {
    type: SUCCESS,
    accounts,
  };
};
const failure = (error) => {
  return {
    type: FAILURE,
    error,
  };
};
export const request = () => {
  return (dispatch) => {
    dispatch(waiting());
    dispatch(loader(true));
    return fetch(`${config.HOST}/api/account/list`)
      .then((res) => {
        dispatch(loader(false));
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          const { accounts } = data;
          return dispatch(success(accounts));
        }
        return dispatch(failure({
          message: 'response에 data가 없습니다.'
        }));
      })
      .catch(e => dispatch(failure(e)));
  };
};