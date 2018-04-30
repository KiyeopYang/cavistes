import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from './data/reducer';
import Login from './scene/Login/reducer';
import SignUp from './scene/SignUp/reducer';
import MyInfo from './scene/MyInfo/reducer';
import AccountManager from './scene/AccountManager/reducer';
import Main from './scene/Main/reducer';
import Detail from './scene/Detail/reducer';
import AccountAttendanceManager from './scene/AccountAttendanceManager/reducer';

export default combineReducers({
  routing: routerReducer,
  data,
  Login,
  SignUp,
  MyInfo,
  AccountManager,
  Main,
  Detail,
  AccountAttendanceManager,
});
