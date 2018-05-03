/* global fetch */
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
