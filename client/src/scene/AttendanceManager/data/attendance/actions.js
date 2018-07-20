/* global fetch */
import {
  getEventByIdRequest,
} from '../../../../data/event/actions';

import loader from '../../../../data/loader/actions';

export const GET_ATTENDANCE_WAITING = 'AttendanceManager/data/attendance/GET_ATTENDANCE_WAITING';
export const GET_ATTENDANCE_SUCCESS = 'AttendanceManager/data/attendance/GET_ATTENDANCE_SUCCESS';
export const GET_ATTENDANCE_FAILURE = 'AttendanceManager/data/attendance/GET_ATTENDANCE_FAILURE';
const getAttendanceWaiting = () => {
  return {
    type: GET_ATTENDANCE_WAITING,
  };
};
const getAttendanceSuccess = (attendance) => {
  return {
    type: GET_ATTENDANCE_SUCCESS,
    attendance,
  };
};
const getAttendanceFailure = (error) => {
  return {
    type: GET_ATTENDANCE_FAILURE,
    error,
  };
};
export const getAttendanceRequest = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(getAttendanceWaiting());
    return fetch(`/api/attendance/eventId/${id}`, {
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
          return dispatch(getAttendanceSuccess(res.data));
        }
        return dispatch(getAttendanceFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getAttendanceFailure(e)));
  };
};

export const UPDATE_ATTENDANCE_WAITING = 'AttendanceManager/data/attendance/UPDATE_ATTENDANCE_WAITING';
export const UPDATE_ATTENDANCE_SUCCESS = 'AttendanceManager/data/attendance/UPDATE_ATTENDANCE_SUCCESS';
export const UPDATE_ATTENDANCE_FAILURE = 'AttendanceManager/data/attendance/UPDATE_ATTENDANCE_FAILURE';
const updateAttendanceWaiting = () => {
  return {
    type: UPDATE_ATTENDANCE_WAITING,
  };
};
const updateAttendanceSuccess = (attendance) => {
  return {
    type: UPDATE_ATTENDANCE_SUCCESS,
    attendance,
  };
};
const updateAttendanceFailure = (error) => {
  return {
    type: UPDATE_ATTENDANCE_FAILURE,
    error,
  };
};
export const updateAttendanceRequest = ({ id, status, eventId }) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(updateAttendanceWaiting());
    return fetch(`/api/attendance/eventId/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
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
          dispatch(getAttendanceRequest(eventId));
          dispatch(getEventByIdRequest(eventId));
          return dispatch(updateAttendanceSuccess(res.data));
        }
        return dispatch(updateAttendanceFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(updateAttendanceFailure(e)));
  };
};
