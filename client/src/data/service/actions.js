/* global fetch */
import loader from '../loader/actions';

export const GET_SERVICE_WAITING = 'data/service/GET_SERVICE_WAITING';
export const GET_SERVICE_SUCCESS = 'data/service/GET_SERVICE_SUCCESS';
export const GET_SERVICE_FAILURE = 'data/service/GET_SERVICE_FAILURE';
const getServiceWaiting = () => {
  return {
    type: GET_SERVICE_WAITING,
  };
};
const getServiceSuccess = (service) => {
  return {
    type: GET_SERVICE_SUCCESS,
    service,
  };
};
const getServiceFailure = (error) => {
  return {
    type: GET_SERVICE_FAILURE,
    error,
  };
};
export const getServiceRequest = () => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(getServiceWaiting());
    return fetch(`/api/service`, {
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
          return dispatch(getServiceSuccess(res.data));
        }
        return dispatch(getServiceFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getServiceFailure(e)));
  };
};

export const UPDATE_SERVICE_WAITING = 'data/service/UPDATE_SERVICE_WAITING';
export const UPDATE_SERVICE_SUCCESS = 'data/service/UPDATE_SERVICE_SUCCESS';
export const UPDATE_SERVICE_FAILURE = 'data/service/UPDATE_SERVICE_FAILURE';
const updateServiceWaiting = () => {
  return {
    type: UPDATE_SERVICE_WAITING,
  };
};
const updateServiceSuccess = () => {
  return {
    type: UPDATE_SERVICE_SUCCESS,
  };
};
const updateServiceFailure = (error) => {
  return {
    type: UPDATE_SERVICE_FAILURE,
    error,
  };
};
export const updateServiceRequest = (input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(updateServiceWaiting());
    return fetch(`/api/service`, {
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
          return dispatch(updateServiceSuccess(res.data));
        }
        return dispatch(updateServiceFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(updateServiceFailure(e)));
  };
};

