import { combineReducers } from 'redux';
import login from './login/reducer';
import passwordFind from './passwordFind/reducer';

export default combineReducers({
  login,
  passwordFind,
});
