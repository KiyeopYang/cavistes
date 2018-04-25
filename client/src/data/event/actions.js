/* global fetch */
import loader from '../loader/actions';

export const GET_EVENT_WAITING = 'data/event/GET_EVENT_WAITING';
export const GET_EVENT_SUCCESS = 'data/event/GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'data/event/GET_EVENT_FAILURE';
const getEventWaiting = () => {
  return {
    type: GET_EVENT_WAITING,
  };
};
const getEventSuccess = (event) => {
  return {
    type: GET_EVENT_SUCCESS,
    event,
  };
};
const getEventFailure = (error) => {
  return {
    type: GET_EVENT_FAILURE,
    error,
  };
};
export const getEventRequest = (i = 0) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(getEventWaiting());
    return fetch(`/api/event/${i}`, {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
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
          return dispatch(getEventSuccess(res.data));
        }
        return dispatch(getEventFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getEventFailure(e)));
  };
};

export const GET_EVENT_BY_ID_WAITING = 'data/event/GET_EVENT_BY_ID_WAITING';
export const GET_EVENT_BY_ID_SUCCESS = 'data/event/GET_EVENT_BY_ID_SUCCESS';
export const GET_EVENT_BY_ID_FAILURE = 'data/event/GET_EVENT_BY_ID_FAILURE';
const getEventByIdWaiting = () => {
  return {
    type: GET_EVENT_BY_ID_WAITING,
  };
};
const getEventByIdSuccess = (event) => {
  return {
    type: GET_EVENT_BY_ID_SUCCESS,
    event,
  };
};
const getEventByIdFailure = (error) => {
  return {
    type: GET_EVENT_BY_ID_FAILURE,
    error,
  };
};
export const getEventByIdRequest = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(getEventByIdWaiting());
    return fetch(`/api/event/id/${id}`, {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
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
          return dispatch(getEventByIdSuccess(res.data));
        }
        return dispatch(getEventByIdFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getEventByIdFailure(e)));
  };
};

export const ADD_EVENT_WAITING = 'data/event/ADD_EVENT_WAITING';
export const ADD_EVENT_SUCCESS = 'data/event/ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAILURE = 'data/event/ADD_EVENT_FAILURE';
const addEventWaiting = () => {
  return {
    type: ADD_EVENT_WAITING,
  };
};
const addEventSuccess = (result) => {
  return {
    type: ADD_EVENT_SUCCESS,
    result,
  };
};
const addEventFailure = (error) => {
  return {
    type: ADD_EVENT_FAILURE,
    error,
  };
};
export const addEventRequest = (input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(addEventWaiting());
    return fetch(`/api/event`, {
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
          return dispatch(addEventSuccess(res.data));
        }
        return dispatch(addEventFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(addEventFailure(e)));
  };
};
export const REMOVE_EVENT_WAITING = 'data/event/REMOVE_EVENT_WAITING';
export const REMOVE_EVENT_SUCCESS = 'data/event/REMOVE_EVENT_SUCCESS';
export const REMOVE_EVENT_FAILURE = 'data/event/REMOVE_EVENT_FAILURE';
const removeEventWaiting = () => {
  return {
    type: REMOVE_EVENT_WAITING,
  };
};
const removeEventSuccess = () => {
  return {
    type: REMOVE_EVENT_SUCCESS,
  };
};
const removeEventFailure = (error) => {
  return {
    type: REMOVE_EVENT_FAILURE,
    error,
  };
};
export const removeEventRequest = (input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(removeEventWaiting());
    return fetch(`/api/event`, {
      method: 'PUT',
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
        console.log(res.data);
        if (res.data) {
          return dispatch(removeEventSuccess(res.data));
        }
        return dispatch(removeEventFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(removeEventFailure(e)));
  };
};

export const UPDATE_EVENT_WAITING = 'data/event/UPDATE_EVENT_WAITING';
export const UPDATE_EVENT_SUCCESS = 'data/event/UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAILURE = 'data/event/UPDATE_EVENT_FAILURE';
const updateEventWaiting = () => {
  return {
    type: UPDATE_EVENT_WAITING,
  };
};
const updateEventSuccess = () => {
  return {
    type: UPDATE_EVENT_SUCCESS,
  };
};
const updateEventFailure = (error) => {
  return {
    type: UPDATE_EVENT_FAILURE,
    error,
  };
};
export const updateEventRequest = (id, input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(updateEventWaiting());
    return fetch(`/api/event/${id}`, {
      method: 'PUT',
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
        console.log(res.data);
        if (res.data) {
          return dispatch(updateEventSuccess(res.data));
        }
        return dispatch(updateEventFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(updateEventFailure(e)));
  };
};

