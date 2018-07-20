import { combineReducers } from 'redux';
import modify from './modify/reducer';
import remove from './remove/reducer';
import isPasswordCorrect from './isPasswordCorrect/reducer';

export default combineReducers({
  modify,
  remove,
  isPasswordCorrect,
});
