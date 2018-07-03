/* global fetch */
import loader from '../../../../data/loader/actions';

export const ADD_ATTENDANCE_WAITING = 'Detail/data/attendance/ADD_ATTENDANCE_WAITING';
export const ADD_ATTENDANCE_SUCCESS = 'Detail/data/attendance/ADD_ATTENDANCE_SUCCESS';
export const ADD_ATTENDANCE_FAILURE = 'Detail/data/attendance/ADD_ATTENDANCE_FAILURE';
const addAttendanceWaiting = () => {
  return {
    type: ADD_ATTENDANCE_WAITING,
  };
};
const addAttendanceSuccess = () => {
  return {
    type: ADD_ATTENDANCE_SUCCESS,
  };
};
const addAttendanceFailure = (error) => {
  return {
    type: ADD_ATTENDANCE_FAILURE,
    error,
  };
};
export const addAttendanceRequest = (input) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(addAttendanceWaiting());
    return fetch(`/api/attendance`, {
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
          return dispatch(addAttendanceSuccess(res.data));
        }
        return dispatch(addAttendanceFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(addAttendanceFailure(e)));
  };
};
export const REMOVE_ATTENDANCE_WAITING = 'Detail/data/attendance/REMOVE_ATTENDANCE_WAITING';
export const REMOVE_ATTENDANCE_SUCCESS = 'Detail/data/attendance/REMOVE_ATTENDANCE_SUCCESS';
export const REMOVE_ATTENDANCE_FAILURE = 'Detail/data/attendance/REMOVE_ATTENDANCE_FAILURE';
const removeAttendanceWaiting = () => {
  return {
    type: REMOVE_ATTENDANCE_WAITING,
  };
};
const removeAttendanceSuccess = () => {
  return {
    type: REMOVE_ATTENDANCE_SUCCESS,
  };
};
const removeAttendanceFailure = (error) => {
  return {
    type: REMOVE_ATTENDANCE_FAILURE,
    error,
  };
};
export const removeAttendanceRequest = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(removeAttendanceWaiting());
    return fetch(`/api/attendance/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
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
          return dispatch(removeAttendanceSuccess(res.data));
        }
        return dispatch(removeAttendanceFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(removeAttendanceFailure(e)));
  };
};
