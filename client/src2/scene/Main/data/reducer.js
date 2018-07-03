import { combineReducers } from 'redux';
import { reducer as accountReducer } from './account/reducer';

export default combineReducers({
  account: accountReducer,
});
