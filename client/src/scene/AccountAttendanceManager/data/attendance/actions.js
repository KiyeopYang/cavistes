/* global fetch */
import loader from '../../../../data/loader/actions';

export const GET_ACCOUNT_ATTENDANCE_WAITING = 'AccountAttendanceManager/data/attendance/GET_ACCOUNT_ATTENDANCE_WAITING';
export const GET_ACCOUNT_ATTENDANCE_SUCCESS = 'AccountAttendanceManager/data/attendance/GET_ACCOUNT_ATTENDANCE_SUCCESS';
export const GET_ACCOUNT_ATTENDANCE_FAILURE = 'AccountAttendanceManager/data/attendance/GET_ACCOUNT_ATTENDANCE_FAILURE';
const getAccountAttendanceWaiting = () => {
  return {
    type: GET_ACCOUNT_ATTENDANCE_WAITING,
  };
};
const getAccountAttendanceSuccess = (attendance) => {
  return {
    type: GET_ACCOUNT_ATTENDANCE_SUCCESS,
    attendance,
  };
};
const getAccountAttendanceFailure = (error) => {
  return {
    type: GET_ACCOUNT_ATTENDANCE_FAILURE,
    error,
  };
};
export const getAccountAttendanceRequest = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(getAccountAttendanceWaiting());
    return fetch(`/api/attendance/accountId/${id}`, {
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
          return dispatch(getAccountAttendanceSuccess(res.data));
        }
        return dispatch(getAccountAttendanceFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getAccountAttendanceFailure(e)));
  };
};
