/* global fetch */
import loader from '../../../../data/loader/actions';

export const ADD_REPLY_WAITING = 'Detail/data/reply/ADD_REPLY_WAITING';
export const ADD_REPLY_SUCCESS = 'Detail/data/reply/ADD_REPLY_SUCCESS';
export const ADD_REPLY_FAILURE = 'Detail/data/reply/ADD_REPLY_FAILURE';
const addReplyWaiting = () => {
  return {
    type: ADD_REPLY_WAITING,
  };
};
const addReplySuccess = () => {
  return {
    type: ADD_REPLY_SUCCESS,
  };
};
const addReplyFailure = (error) => {
  return {
    type: ADD_REPLY_FAILURE,
    error,
  };
};
export const addReplyRequest = (input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(addReplyWaiting());
    return fetch(`/api/event/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then((res) => {
        dispatch(loader(false));
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(addReplySuccess(res.data));
        }
        return dispatch(addReplyFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(addReplyFailure(e)));
  };
};
export const REMOVE_REPLY_WAITING = 'Detail/data/reply/REMOVE_REPLY_WAITING';
export const REMOVE_REPLY_SUCCESS = 'Detail/data/reply/REMOVE_REPLY_SUCCESS';
export const REMOVE_REPLY_FAILURE = 'Detail/data/reply/REMOVE_REPLY_FAILURE';
const removeReplyWaiting = () => {
  return {
    type: REMOVE_REPLY_WAITING,
  };
};
const removeReplySuccess = () => {
  return {
    type: REMOVE_REPLY_SUCCESS,
  };
};
const removeReplyFailure = (error) => {
  return {
    type: REMOVE_REPLY_FAILURE,
    error,
  };
};
export const removeReplyRequest = (input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(removeReplyWaiting());
    return fetch(`/api/event/reply`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then((res) => {
        console.log(res);
        dispatch(loader(false));
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(removeReplySuccess(res.data));
        }
        return dispatch(removeReplyFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(removeReplyFailure(e)));
  };
};
