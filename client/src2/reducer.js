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
import AccountView from './scene/AccountView/reducer';
import AttendanceManager from './scene/AttendanceManager/reducer';
import PaymentManager from './scene/PaymentManager/reducer';
import Notice from './scene/Notice/reducer';
import Location from './scene/Location/reducer';
import Sponsor from './scene/Sponsor/reducer';

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
  AccountView,
  AttendanceManager,
  PaymentManager,
  Notice,
  Location,
  Sponsor,
});
