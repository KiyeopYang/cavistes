/* global fetch */
import config from '../../../../config';
import * as cookie from '../../../../modules/cookie';
import loader from '../../../../data/loader/actions';

export const WAITING = 'MyInfo/data/modify/WAITING';
export const SUCCESS = 'MyInfo/data/modify/SUCCESS';
export const FAILURE = 'MyInfo/data/modify/FAILURE';

const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = () => {
  return {
    type: SUCCESS,
  };
};
const failure = (error) => {
  return {
    type: FAILURE,
    error,
  };
};
export const request = (input) => {
  return (dispatch) => {
    dispatch(waiting());
    dispatch(loader(true));
    return fetch(`${config.HOST}/api/account`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie.get('token')}`,
      },
      body: JSON.stringify(input),
    })
      .then((res) => {
        dispatch(loader(false));
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(success());
        }
        return dispatch(failure({
          message: 'response에 data가 없습니다.'
        }));
      })
      .catch(e => dispatch(failure(e)));
  };
};