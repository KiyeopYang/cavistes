import { combineReducers } from 'redux';
import loader from './loader/reducer';
import noticeDialog from './noticeDialog/reducer';
import auth from './auth/reducer';
import requestPassword from './requestPassword/reducer';
import event from './event/reducer';
import service from './service/reducer';

export default combineReducers({
  loader,
  noticeDialog,
  auth,
  requestPassword,
  event,
  service,
});
