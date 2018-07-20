/* global fetch */
import loader from '../../../../data/loader/actions';

export const GET_LOCATION_WAITING = 'data/location/GET_LOCATION_WAITING';
export const GET_LOCATION_SUCCESS = 'data/location/GET_LOCATION_SUCCESS';
export const GET_LOCATION_FAILURE = 'data/location/GET_LOCATION_FAILURE';
const getLocationWaiting = () => {
  return {
    type: GET_LOCATION_WAITING,
  };
};
const getLocationSuccess = (location) => {
  return {
    type: GET_LOCATION_SUCCESS,
    location,
  };
};
const getLocationFailure = (error) => {
  return {
    type: GET_LOCATION_FAILURE,
    error,
  };
};
export const getLocationRequest = () => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(getLocationWaiting());
    return fetch(`/api/location`, {
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
          return dispatch(getLocationSuccess(res.data));
        }
        return dispatch(getLocationFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getLocationFailure(e)));
  };
};

export const ADD_LOCATION_WAITING = 'data/location/ADD_LOCATION_WAITING';
export const ADD_LOCATION_SUCCESS = 'data/location/ADD_LOCATION_SUCCESS';
export const ADD_LOCATION_FAILURE = 'data/location/ADD_LOCATION_FAILURE';
const addLocationWaiting = () => {
  return {
    type: ADD_LOCATION_WAITING,
  };
};
const addLocationSuccess = (result) => {
  return {
    type: ADD_LOCATION_SUCCESS,
    result,
  };
};
const addLocationFailure = (error) => {
  return {
    type: ADD_LOCATION_FAILURE,
    error,
  };
};
export const addLocationRequest = (input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(addLocationWaiting());
    return fetch(`/api/location`, {
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
          return dispatch(addLocationSuccess(res.data));
        }
        return dispatch(addLocationFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(addLocationFailure(e)));
  };
};
export const REMOVE_LOCATION_WAITING = 'data/location/REMOVE_LOCATION_WAITING';
export const REMOVE_LOCATION_SUCCESS = 'data/location/REMOVE_LOCATION_SUCCESS';
export const REMOVE_LOCATION_FAILURE = 'data/location/REMOVE_LOCATION_FAILURE';
const removeLocationWaiting = () => {
  return {
    type: REMOVE_LOCATION_WAITING,
  };
};
const removeLocationSuccess = () => {
  return {
    type: REMOVE_LOCATION_SUCCESS,
  };
};
const removeLocationFailure = (error) => {
  return {
    type: REMOVE_LOCATION_FAILURE,
    error,
  };
};
export const removeLocationRequest = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(removeLocationWaiting());
    return fetch(`/api/location/${id}`, {
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
          return dispatch(removeLocationSuccess(res.data));
        }
        return dispatch(removeLocationFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(removeLocationFailure(e)));
  };
};

export const UPDATE_LOCATION_WAITING = 'data/location/UPDATE_LOCATION_WAITING';
export const UPDATE_LOCATION_SUCCESS = 'data/location/UPDATE_LOCATION_SUCCESS';
export const UPDATE_LOCATION_FAILURE = 'data/location/UPDATE_LOCATION_FAILURE';
const updateLocationWaiting = () => {
  return {
    type: UPDATE_LOCATION_WAITING,
  };
};
const updateLocationSuccess = () => {
  return {
    type: UPDATE_LOCATION_SUCCESS,
  };
};
const updateLocationFailure = (error) => {
  return {
    type: UPDATE_LOCATION_FAILURE,
    error,
  };
};
export const updateLocationRequest = (id, input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(updateLocationWaiting());
    return fetch(`/api/location/${id}`, {
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
          return dispatch(updateLocationSuccess(res.data));
        }
        return dispatch(updateLocationFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(updateLocationFailure(e)));
  };
};

