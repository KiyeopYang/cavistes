import { combineReducers } from 'redux';
import { reducer as accountReducer } from './account/reducer';
import { reducer as serviceReducer } from './service/reducer';

export default combineReducers({
  account: accountReducer,
  service: serviceReducer,
});
