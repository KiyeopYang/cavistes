import update from 'react-addons-update';
import {
  REMOVE_REPLY_WAITING,
  REMOVE_REPLY_SUCCESS,
  REMOVE_REPLY_FAILURE,
  ADD_REPLY_WAITING,
  ADD_REPLY_SUCCESS,
  ADD_REPLY_FAILURE,
} from './actions';

const initialState = {
  removeReply: {
    status: 'INIT',
  },
  addReply: {
    status: 'INIT',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_REPLY_WAITING:
      return update(state, {
        addReply: {
          status: { $set: 'WAITING' },
        },
      });
    case ADD_REPLY_SUCCESS:
      return update(state, {
        addReply: {
          status: { $set: 'SUCCESS' },
        },
      });
    case ADD_REPLY_FAILURE:
      return update(state, {
        addReply: {
          status: { $set: 'FAILURE' },
        },
      });
    case REMOVE_REPLY_WAITING:
      return update(state, {
        removeReply: {
          status: { $set: 'WAITING' },
        },
      });
    case REMOVE_REPLY_SUCCESS:
      return update(state, {
        removeReply: {
          status: { $set: 'SUCCESS' },
        },
      });
    case REMOVE_REPLY_FAILURE:
      return update(state, {
        removeReply: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
