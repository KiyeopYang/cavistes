import update from 'react-addons-update';
import {
  GET_SPONSOR_WAITING,
  GET_SPONSOR_SUCCESS,
  GET_SPONSOR_FAILURE,
  UPDATE_SPONSOR_WAITING,
  UPDATE_SPONSOR_SUCCESS,
  UPDATE_SPONSOR_FAILURE,
  REMOVE_SPONSOR_WAITING,
  REMOVE_SPONSOR_SUCCESS,
  REMOVE_SPONSOR_FAILURE,
  ADD_SPONSOR_WAITING,
  ADD_SPONSOR_SUCCESS,
  ADD_SPONSOR_FAILURE,
} from './actions';

const initialState = {
  getSponsor: {
    status: 'INIT',
    sponsor: [],
  },
  updateSponsor: {
    status: 'INIT',
  },
  removeSponsor: {
    status: 'INIT',
  },
  addSponsor: {
    status: 'INIT',
    result: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SPONSOR_WAITING:
      return update(state, {
        getSponsor: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_SPONSOR_SUCCESS:
      return update(state, {
          getSponsor: {
            status: { $set: 'SUCCESS' },
            sponsor: { $set: action.sponsor },
          },
        });
    case GET_SPONSOR_FAILURE:
      return update(state, {
        getSponsor: {
          status: { $set: 'FAILURE' },
        },
      });
    case UPDATE_SPONSOR_WAITING:
      return update(state, {
        updateSponsor: {
          status: { $set: 'WAITING' },
        },
      });
    case UPDATE_SPONSOR_SUCCESS:
      return update(state, {
        updateSponsor: {
          status: { $set: 'SUCCESS' },
        },
      });
    case UPDATE_SPONSOR_FAILURE:
      return update(state, {
        updateSponsor: {
          status: { $set: 'FAILURE' },
        },
      });
    case ADD_SPONSOR_WAITING:
      return update(state, {
        addSponsor: {
          status: { $set: 'WAITING' },
        },
      });
    case ADD_SPONSOR_SUCCESS:
      return update(state, {
        addSponsor: {
          status: { $set: 'SUCCESS' },
          result: { $set: action.result },
        },
      });
    case ADD_SPONSOR_FAILURE:
      return update(state, {
        addSponsor: {
          status: { $set: 'FAILURE' },
        },
      });
    case REMOVE_SPONSOR_WAITING:
      return update(state, {
        removeSponsor: {
          status: { $set: 'WAITING' },
        },
      });
    case REMOVE_SPONSOR_SUCCESS:
      return update(state, {
        removeSponsor: {
          status: { $set: 'SUCCESS' },
        },
      });
    case REMOVE_SPONSOR_FAILURE:
      return update(state, {
        removeSponsor: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
