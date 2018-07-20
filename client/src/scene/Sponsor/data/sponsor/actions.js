/* global fetch */
import loader from '../../../../data/loader/actions';

export const GET_SPONSOR_WAITING = 'data/sponsor/GET_SPONSOR_WAITING';
export const GET_SPONSOR_SUCCESS = 'data/sponsor/GET_SPONSOR_SUCCESS';
export const GET_SPONSOR_FAILURE = 'data/sponsor/GET_SPONSOR_FAILURE';
const getSponsorWaiting = () => {
  return {
    type: GET_SPONSOR_WAITING,
  };
};
const getSponsorSuccess = (sponsor) => {
  return {
    type: GET_SPONSOR_SUCCESS,
    sponsor,
  };
};
const getSponsorFailure = (error) => {
  return {
    type: GET_SPONSOR_FAILURE,
    error,
  };
};
export const getSponsorRequest = () => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(getSponsorWaiting());
    return fetch(`/api/sponsor`, {
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
          return dispatch(getSponsorSuccess(res.data));
        }
        return dispatch(getSponsorFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getSponsorFailure(e)));
  };
};

export const ADD_SPONSOR_WAITING = 'data/sponsor/ADD_SPONSOR_WAITING';
export const ADD_SPONSOR_SUCCESS = 'data/sponsor/ADD_SPONSOR_SUCCESS';
export const ADD_SPONSOR_FAILURE = 'data/sponsor/ADD_SPONSOR_FAILURE';
const addSponsorWaiting = () => {
  return {
    type: ADD_SPONSOR_WAITING,
  };
};
const addSponsorSuccess = (result) => {
  return {
    type: ADD_SPONSOR_SUCCESS,
    result,
  };
};
const addSponsorFailure = (error) => {
  return {
    type: ADD_SPONSOR_FAILURE,
    error,
  };
};
export const addSponsorRequest = (input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(addSponsorWaiting());
    return fetch(`/api/sponsor`, {
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
          return dispatch(addSponsorSuccess(res.data));
        }
        return dispatch(addSponsorFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(addSponsorFailure(e)));
  };
};
export const REMOVE_SPONSOR_WAITING = 'data/sponsor/REMOVE_SPONSOR_WAITING';
export const REMOVE_SPONSOR_SUCCESS = 'data/sponsor/REMOVE_SPONSOR_SUCCESS';
export const REMOVE_SPONSOR_FAILURE = 'data/sponsor/REMOVE_SPONSOR_FAILURE';
const removeSponsorWaiting = () => {
  return {
    type: REMOVE_SPONSOR_WAITING,
  };
};
const removeSponsorSuccess = () => {
  return {
    type: REMOVE_SPONSOR_SUCCESS,
  };
};
const removeSponsorFailure = (error) => {
  return {
    type: REMOVE_SPONSOR_FAILURE,
    error,
  };
};
export const removeSponsorRequest = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(removeSponsorWaiting());
    return fetch(`/api/sponsor/${id}`, {
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
          return dispatch(removeSponsorSuccess(res.data));
        }
        return dispatch(removeSponsorFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(removeSponsorFailure(e)));
  };
};

export const UPDATE_SPONSOR_WAITING = 'data/sponsor/UPDATE_SPONSOR_WAITING';
export const UPDATE_SPONSOR_SUCCESS = 'data/sponsor/UPDATE_SPONSOR_SUCCESS';
export const UPDATE_SPONSOR_FAILURE = 'data/sponsor/UPDATE_SPONSOR_FAILURE';
const updateSponsorWaiting = () => {
  return {
    type: UPDATE_SPONSOR_WAITING,
  };
};
const updateSponsorSuccess = () => {
  return {
    type: UPDATE_SPONSOR_SUCCESS,
  };
};
const updateSponsorFailure = (error) => {
  return {
    type: UPDATE_SPONSOR_FAILURE,
    error,
  };
};
export const updateSponsorRequest = (id, input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(updateSponsorWaiting());
    return fetch(`/api/sponsor/${id}`, {
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
          return dispatch(updateSponsorSuccess(res.data));
        }
        return dispatch(updateSponsorFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(updateSponsorFailure(e)));
  };
};

