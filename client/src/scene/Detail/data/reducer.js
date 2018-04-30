import { combineReducers } from 'redux';
import replyReducer from './reply/reducer';
import attendanceReducer from './attendance/reducer';

export default combineReducers({
  reply: replyReducer,
  attendance: attendanceReducer,
});
