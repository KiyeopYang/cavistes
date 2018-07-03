import update from 'react-addons-update';
import {
  GET_ACCOUNT_ATTENDANCE_WAITING,
  GET_ACCOUNT_ATTENDANCE_SUCCESS,
  GET_ACCOUNT_ATTENDANCE_FAILURE,
} from './actions';

const initialState = {
  getAccountAttendance: {
    status: 'INIT',
    attendance: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_ATTENDANCE_WAITING:
      return update(state, {
        getAccountAttendance: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_ACCOUNT_ATTENDANCE_SUCCESS:
      return update(state, {
        getAccountAttendance: {
          status: { $set: 'SUCCESS' },
          attendance: { $set: action.attendance },
        },
      });
    case GET_ACCOUNT_ATTENDANCE_FAILURE:
      return update(state, {
        getAccountAttendance: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
