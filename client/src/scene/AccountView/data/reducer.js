import { combineReducers } from 'redux';
import account from './account/reducer';
import modify from './modify/reducer';
import remove from './remove/reducer';

export default combineReducers({
  account,
  modify,
  remove,
});
