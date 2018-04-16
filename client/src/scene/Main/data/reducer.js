import { combineReducers } from 'redux';
import { reducer as accountReducer } from './account/reducer';

export const reducer = combineReducers({
  account: accountReducer,
});
