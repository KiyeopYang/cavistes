import update from 'react-addons-update';
import {
  GET_ATTENDANCE_WAITING,
  GET_ATTENDANCE_SUCCESS,
  GET_ATTENDANCE_FAILURE,
  UPDATE_ATTENDANCE_WAITING,
  UPDATE_ATTENDANCE_SUCCESS,
  UPDATE_ATTENDANCE_FAILURE,
} from './actions';

const initialState = {
  getAttendance: {
    status: 'INIT',
    attendance: [],
  },
  updateAttendance: {
    status: 'INIT',
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
    case UPDATE_ATTENDANCE_WAITING:
      return update(state, {
        updateAttendance: {
          status: { $set: 'WAITING' },
        },
      });
    case UPDATE_ATTENDANCE_SUCCESS:
      return update(state, {
        updateAttendance: {
          status: { $set: 'SUCCESS' },
        },
      });
    case UPDATE_ATTENDANCE_FAILURE:
      return update(state, {
        updateAttendance: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
