/* global fetch */
import loader from '../../../../data/loader/actions';

export const GET_NOTICE_WAITING = 'data/notice/GET_NOTICE_WAITING';
export const GET_NOTICE_SUCCESS = 'data/notice/GET_NOTICE_SUCCESS';
export const GET_NOTICE_FAILURE = 'data/notice/GET_NOTICE_FAILURE';
const getNoticeWaiting = () => {
  return {
    type: GET_NOTICE_WAITING,
  };
};
const getNoticeSuccess = (notice) => {
  return {
    type: GET_NOTICE_SUCCESS,
    notice,
  };
};
const getNoticeFailure = (error) => {
  return {
    type: GET_NOTICE_FAILURE,
    error,
  };
};
export const getNoticeRequest = () => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(getNoticeWaiting());
    return fetch(`/api/notice`, {
      method: 'GET',
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
          return dispatch(getNoticeSuccess(res.data));
        }
        return dispatch(getNoticeFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getNoticeFailure(e)));
  };
};

export const ADD_NOTICE_WAITING = 'data/notice/ADD_NOTICE_WAITING';
export const ADD_NOTICE_SUCCESS = 'data/notice/ADD_NOTICE_SUCCESS';
export const ADD_NOTICE_FAILURE = 'data/notice/ADD_NOTICE_FAILURE';
const addNoticeWaiting = () => {
  return {
    type: ADD_NOTICE_WAITING,
  };
};
const addNoticeSuccess = (result) => {
  return {
    type: ADD_NOTICE_SUCCESS,
    result,
  };
};
const addNoticeFailure = (error) => {
  return {
    type: ADD_NOTICE_FAILURE,
    error,
  };
};
export const addNoticeRequest = (input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(addNoticeWaiting());
    return fetch(`/api/notice`, {
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
          return dispatch(addNoticeSuccess(res.data));
        }
        return dispatch(addNoticeFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(addNoticeFailure(e)));
  };
};
export const REMOVE_NOTICE_WAITING = 'data/notice/REMOVE_NOTICE_WAITING';
export const REMOVE_NOTICE_SUCCESS = 'data/notice/REMOVE_NOTICE_SUCCESS';
export const REMOVE_NOTICE_FAILURE = 'data/notice/REMOVE_NOTICE_FAILURE';
const removeNoticeWaiting = () => {
  return {
    type: REMOVE_NOTICE_WAITING,
  };
};
const removeNoticeSuccess = () => {
  return {
    type: REMOVE_NOTICE_SUCCESS,
  };
};
const removeNoticeFailure = (error) => {
  return {
    type: REMOVE_NOTICE_FAILURE,
    error,
  };
};
export const removeNoticeRequest = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(removeNoticeWaiting());
    return fetch(`/api/notice/${id}`, {
      method: 'DELETE',
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
          return dispatch(removeNoticeSuccess(res.data));
        }
        return dispatch(removeNoticeFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(removeNoticeFailure(e)));
  };
};

export const UPDATE_NOTICE_WAITING = 'data/notice/UPDATE_NOTICE_WAITING';
export const UPDATE_NOTICE_SUCCESS = 'data/notice/UPDATE_NOTICE_SUCCESS';
export const UPDATE_NOTICE_FAILURE = 'data/notice/UPDATE_NOTICE_FAILURE';
const updateNoticeWaiting = () => {
  return {
    type: UPDATE_NOTICE_WAITING,
  };
};
const updateNoticeSuccess = () => {
  return {
    type: UPDATE_NOTICE_SUCCESS,
  };
};
const updateNoticeFailure = (error) => {
  return {
    type: UPDATE_NOTICE_FAILURE,
    error,
  };
};
export const updateNoticeRequest = (id, input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(updateNoticeWaiting());
    return fetch(`/api/notice/${id}`, {
      method: 'PUT',
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
          return dispatch(updateNoticeSuccess(res.data));
        }
        return dispatch(updateNoticeFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(updateNoticeFailure(e)));
  };
};

