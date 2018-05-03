import update from 'react-addons-update';
import {
  GET_NOTICE_WAITING,
  GET_NOTICE_SUCCESS,
  GET_NOTICE_FAILURE,
  UPDATE_NOTICE_WAITING,
  UPDATE_NOTICE_SUCCESS,
  UPDATE_NOTICE_FAILURE,
  REMOVE_NOTICE_WAITING,
  REMOVE_NOTICE_SUCCESS,
  REMOVE_NOTICE_FAILURE,
  ADD_NOTICE_WAITING,
  ADD_NOTICE_SUCCESS,
  ADD_NOTICE_FAILURE,
} from './actions';

const initialState = {
  getNotice: {
    status: 'INIT',
    notice: [],
  },
  updateNotice: {
    status: 'INIT',
  },
  removeNotice: {
    status: 'INIT',
  },
  addNotice: {
    status: 'INIT',
    result: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTICE_WAITING:
      return update(state, {
        getNotice: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_NOTICE_SUCCESS:
      return update(state,{
          getNotice: {
            status: { $set: 'SUCCESS' },
            notice: { $set: action.notice },
          },
        });
    case GET_NOTICE_FAILURE:
      return update(state, {
        getNotice: {
          status: { $set: 'FAILURE' },
        },
      });
    case UPDATE_NOTICE_WAITING:
      return update(state, {
        updateNotice: {
          status: { $set: 'WAITING' },
        },
      });
    case UPDATE_NOTICE_SUCCESS:
      return update(state, {
        updateNotice: {
          status: { $set: 'SUCCESS' },
        },
      });
    case UPDATE_NOTICE_FAILURE:
      return update(state, {
        updateNotice: {
          status: { $set: 'FAILURE' },
        },
      });
    case ADD_NOTICE_WAITING:
      return update(state, {
        addNotice: {
          status: { $set: 'WAITING' },
        },
      });
    case ADD_NOTICE_SUCCESS:
      return update(state, {
        addNotice: {
          status: { $set: 'SUCCESS' },
          result: { $set: action.result },
        },
      });
    case ADD_NOTICE_FAILURE:
      return update(state, {
        addNotice: {
          status: { $set: 'FAILURE' },
        },
      });
    case REMOVE_NOTICE_WAITING:
      return update(state, {
        removeNotice: {
          status: { $set: 'WAITING' },
        },
      });
    case REMOVE_NOTICE_SUCCESS:
      return update(state, {
        removeNotice: {
          status: { $set: 'SUCCESS' },
        },
      });
    case REMOVE_NOTICE_FAILURE:
      return update(state, {
        removeNotice: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
