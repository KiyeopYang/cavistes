import update from 'react-addons-update';
import {
  REMOVE_ATTENDANCE_WAITING,
  REMOVE_ATTENDANCE_SUCCESS,
  REMOVE_ATTENDANCE_FAILURE,
  ADD_ATTENDANCE_WAITING,
  ADD_ATTENDANCE_SUCCESS,
  ADD_ATTENDANCE_FAILURE,
} from './actions';

const initialState = {
  removeAttendance: {
    status: 'INIT',
  },
  addAttendance: {
    status: 'INIT',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ATTENDANCE_WAITING:
      return update(state, {
        addAttendance: {
          status: { $set: 'WAITING' },
        },
      });
    case ADD_ATTENDANCE_SUCCESS:
      return update(state, {
        addAttendance: {
          status: { $set: 'SUCCESS' },
        },
      });
    case ADD_ATTENDANCE_FAILURE:
      return update(state, {
        addAttendance: {
          status: { $set: 'FAILURE' },
        },
      });
    case REMOVE_ATTENDANCE_WAITING:
      return update(state, {
        removeAttendance: {
          status: { $set: 'WAITING' },
        },
      });
    case REMOVE_ATTENDANCE_SUCCESS:
      return update(state, {
        removeAttendance: {
          status: { $set: 'SUCCESS' },
        },
      });
    case REMOVE_ATTENDANCE_FAILURE:
      return update(state, {
        removeAttendance: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
