import { combineReducers } from 'redux';
import modify from './modify/reducer';
import remove from './remove/reducer';
export default combineReducers({
  modify,
  remove,
});
