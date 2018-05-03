/* global fetch */
import config from '../../../../config';
import loader from '../../../../data/loader/actions';

export const WAITING = 'AccountView/data/account/WAITING';
export const SUCCESS = 'AccountView/data/account/SUCCESS';
export const FAILURE = 'AccountView/data/account/FAILURE';

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
export const request = (id) => {
  return (dispatch) => {
    dispatch(waiting());
    dispatch(loader(true));
    return fetch(`${config.HOST}/api/account/${id}`)
      .then((res) => {
        dispatch(loader(false));
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          const { account } = data;
          return dispatch(success(account));
        }
        return dispatch(failure({
          message: 'response에 data가 없습니다.'
        }));
      })
      .catch(e => dispatch(failure(e)));
  };
};