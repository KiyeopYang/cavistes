import update from 'react-addons-update';
import {
  GET_ATTENDANCE_WAITING,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_FAILURE,
} from './actions';

const initialState = {
  getAttendance: {
    status: 'INIT',
    attendance: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ATTENDANCE_WAITING:
      return update(state, {
        getAttendance: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_ATTENDANCE_SUCCESS:
      return update(state, {
        getAttendance: {
          status: { $set: 'SUCCESS' },
          attendance: { $set: action.attendance },
        },
      });
    case GET_ATTENDANCE_FAILURE:
      return update(state, {
        getAttendance: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
