import update from 'react-addons-update';
import {
  GET_LOCATION_WAITING,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  UPDATE_LOCATION_WAITING,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAILURE,
  REMOVE_LOCATION_WAITING,
  REMOVE_LOCATION_SUCCESS,
  REMOVE_LOCATION_FAILURE,
  ADD_LOCATION_WAITING,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAILURE,
} from './actions';

const initialState = {
  getLocation: {
    status: 'INIT',
    location: [],
  },
  updateLocation: {
    status: 'INIT',
  },
  removeLocation: {
    status: 'INIT',
  },
  addLocation: {
    status: 'INIT',
    result: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_WAITING:
      return update(state, {
        getLocation: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_LOCATION_SUCCESS:
      return update(state, {
          getLocation: {
            status: { $set: 'SUCCESS' },
            location: { $set: action.location },
          },
        });
    case GET_LOCATION_FAILURE:
      return update(state, {
        getLocation: {
          status: { $set: 'FAILURE' },
        },
      });
    case UPDATE_LOCATION_WAITING:
      return update(state, {
        updateLocation: {
          status: { $set: 'WAITING' },
        },
      });
    case UPDATE_LOCATION_SUCCESS:
      return update(state, {
        updateLocation: {
          status: { $set: 'SUCCESS' },
        },
      });
    case UPDATE_LOCATION_FAILURE:
      return update(state, {
        updateLocation: {
          status: { $set: 'FAILURE' },
        },
      });
    case ADD_LOCATION_WAITING:
      return update(state, {
        addLocation: {
          status: { $set: 'WAITING' },
        },
      });
    case ADD_LOCATION_SUCCESS:
      return update(state, {
        addLocation: {
          status: { $set: 'SUCCESS' },
          result: { $set: action.result },
        },
      });
    case ADD_LOCATION_FAILURE:
      return update(state, {
        addLocation: {
          status: { $set: 'FAILURE' },
        },
      });
    case REMOVE_LOCATION_WAITING:
      return update(state, {
        removeLocation: {
          status: { $set: 'WAITING' },
        },
      });
    case REMOVE_LOCATION_SUCCESS:
      return update(state, {
        removeLocation: {
          status: { $set: 'SUCCESS' },
        },
      });
    case REMOVE_LOCATION_FAILURE:
      return update(state, {
        removeLocation: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
