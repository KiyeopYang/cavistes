import update from 'react-addons-update';
import {
  GET_EVENT_WAITING,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAILURE,
  GET_EVENT_BY_ID_WAITING,
  GET_EVENT_BY_ID_SUCCESS,
  GET_EVENT_BY_ID_FAILURE,
  UPDATE_EVENT_WAITING,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAILURE,
  REMOVE_EVENT_WAITING,
  REMOVE_EVENT_SUCCESS,
  REMOVE_EVENT_FAILURE,
  ADD_EVENT_WAITING,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
} from './actions';

const initialState = {
  getEvent: {
    status: 'INIT',
    event: [],
    page: 0,
  },
  getEventById: {
    status: 'INIT',
    event: null,
  },
  updateEvent: {
    status: 'INIT',
  },
  removeEvent: {
    status: 'INIT',
  },
  addEvent: {
    status: 'INIT',
    result: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENT_WAITING:
      return update(state, {
        getEvent: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_EVENT_SUCCESS:
      return update(state, action.page === 0 ?
        {
          getEvent: {
            status: { $set: 'SUCCESS' },
            event: { $set: action.event },
            page: { $set: 0 },
          },
        }:{
          getEvent: {
            status: { $set: 'SUCCESS' },
            event: { $push: action.event },
            page: { $set: action.page },
          },
        });
    case GET_EVENT_FAILURE:
      return update(state, {
        getEvent: {
          status: { $set: 'FAILURE' },
        },
      });
    case GET_EVENT_BY_ID_WAITING:
      return update(state, {
        getEventById: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_EVENT_BY_ID_SUCCESS:
      return update(state, {
        getEventById: {
          status: { $set: 'SUCCESS' },
          event: { $set: action.event },
        },
      });
    case GET_EVENT_BY_ID_FAILURE:
      return update(state, {
        getEventById: {
          status: { $set: 'FAILURE' },
        },
      });
    case UPDATE_EVENT_WAITING:
      return update(state, {
        updateEvent: {
          status: { $set: 'WAITING' },
        },
      });
    case UPDATE_EVENT_SUCCESS:
      return update(state, {
        updateEvent: {
          status: { $set: 'SUCCESS' },
        },
      });
    case UPDATE_EVENT_FAILURE:
      return update(state, {
        updateEvent: {
          status: { $set: 'FAILURE' },
        },
      });
    case ADD_EVENT_WAITING:
      return update(state, {
        addEvent: {
          status: { $set: 'WAITING' },
        },
      });
    case ADD_EVENT_SUCCESS:
      return update(state, {
        addEvent: {
          status: { $set: 'SUCCESS' },
          result: { $set: action.result },
        },
      });
    case ADD_EVENT_FAILURE:
      return update(state, {
        addEvent: {
          status: { $set: 'FAILURE' },
        },
      });
    case REMOVE_EVENT_WAITING:
      return update(state, {
        removeEvent: {
          status: { $set: 'WAITING' },
        },
      });
    case REMOVE_EVENT_SUCCESS:
      return update(state, {
        removeEvent: {
          status: { $set: 'SUCCESS' },
        },
      });
    case REMOVE_EVENT_FAILURE:
      return update(state, {
        removeEvent: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
