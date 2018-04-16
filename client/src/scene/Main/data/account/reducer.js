import update from 'react-addons-update';
import {
  GET_WAITING,
  GET_SUCCESS,
  GET_FAILURE,
  LOGIN_WAITING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  MAKE_ACCOUNT_WAITING,
  MAKE_ACCOUNT_SUCCESS,
  MAKE_ACCOUNT_FAILURE,
  SET_NAME_WAITING,
  SET_NAME_SUCCESS,
  SET_NAME_FAILURE,
  SET_SIZE_WAITING,
  SET_SIZE_SUCCESS,
  SET_SIZE_FAILURE,
  SET_ROUTINE_WAITING,
  SET_ROUTINE_SUCCESS,
  SET_ROUTINE_FAILURE,
  REMOVE_WAITING,
  REMOVE_SUCCESS,
  REMOVE_FAILURE,
} from './actions';

const initialState = {
  get: {
    status: 'INIT',
    account: null,
  },
  login: {
    status: 'INIT',
  },
  makeAccount: {
    status: 'INIT',
  },
  setName: {
    status: 'INIT',
  },
  setSize: {
    status: 'INIT',
  },
  setRoutine: {
    status: 'INIT',
  },
  remove: {
    status: 'INIT',
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WAITING:
      return update(state, {
        get: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_SUCCESS:
      return update(state, {
        get: {
          status: { $set: 'SUCCESS' },
          account: { $set: action.data },
        },
      });
    case GET_FAILURE:
      return update(state, {
        get: {
          status: { $set: 'FAILURE' },
          account: { $set: null },
        },
      });
    case LOGIN_WAITING:
      return update(state, {
        login: {
          status: { $set: 'WAITING' },
        },
      });
    case LOGIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' },
        },
      });
    case LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
        },
      });
    case MAKE_ACCOUNT_WAITING:
      return update(state, {
        makeAccount: {
          status: { $set: 'WAITING' },
        },
      });
    case MAKE_ACCOUNT_SUCCESS:
      return update(state, {
        makeAccount: {
          status: { $set: 'SUCCESS' },
        },
      });
    case MAKE_ACCOUNT_FAILURE:
      return update(state, {
        makeAccount: {
          status: { $set: 'FAILURE' },
        },
      });
    case SET_NAME_WAITING:
      return update(state, {
        setName: {
          status: { $set: 'WAITING' },
        },
      });
    case SET_NAME_SUCCESS:
      return update(state, {
        setName: {
          status: { $set: 'SUCCESS' },
        },
      });
    case SET_NAME_FAILURE:
      return update(state, {
        setName: {
          status: { $set: 'FAILURE' },
        },
      });
    case SET_SIZE_WAITING:
      return update(state, {
        setSize: {
          status: { $set: 'WAITING' },
        },
      });
    case SET_SIZE_SUCCESS:
      return update(state, {
        setSize: {
          status: { $set: 'SUCCESS' },
        },
      });
    case SET_SIZE_FAILURE:
      return update(state, {
        setSize: {
          status: { $set: 'FAILURE' },
        },
      });
    case SET_ROUTINE_WAITING:
      return update(state, {
        setRoutine: {
          status: { $set: 'WAITING' },
        },
      });
    case SET_ROUTINE_SUCCESS:
      return update(state, {
        setRoutine: {
          status: { $set: 'SUCCESS' },
        },
      });
    case SET_ROUTINE_FAILURE:
      return update(state, {
        setRoutine: {
          status: { $set: 'FAILURE' },
        },
      });
    case REMOVE_WAITING:
      return update(state, {
        remove: {
          status: { $set: 'WAITING' },
        },
      });
    case REMOVE_SUCCESS:
      return update(state, {
        remove: {
          status: { $set: 'SUCCESS' },
        },
      });
    case REMOVE_FAILURE:
      return update(state, {
        remove: {
          status: { $set: 'FAILURE' },
        },
      });


    default:
      return state;
  }
};
