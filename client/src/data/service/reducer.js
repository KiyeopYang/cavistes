import update from 'react-addons-update';
import {
  GET_SERVICE_WAITING,
  GET_SERVICE_SUCCESS,
  GET_SERVICE_FAILURE,
  UPDATE_SERVICE_WAITING,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
} from './actions';

const initialState = {
  getService: {
    status: 'INIT',
    service: undefined,
  },
  updateService: {
    status: 'INIT',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICE_WAITING:
      return update(state, {
        getService: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_SERVICE_SUCCESS:
      return update(state, {
        getService: {
          status: { $set: 'SUCCESS' },
          service: { $set: action.service },
        },
      });
    case GET_SERVICE_FAILURE:
      return update(state, {
        getService: {
          status: { $set: 'FAILURE' },
        },
      });
    case UPDATE_SERVICE_WAITING:
      return update(state, {
        updateService: {
          status: { $set: 'WAITING' },
        },
      });
    case UPDATE_SERVICE_SUCCESS:
      return update(state, {
        updateService: {
          status: { $set: 'SUCCESS' },
        },
      });
    case UPDATE_SERVICE_FAILURE:
      return update(state, {
        updateService: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
