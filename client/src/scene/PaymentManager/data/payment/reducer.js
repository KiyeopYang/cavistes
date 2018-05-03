import update from 'react-addons-update';
import {
  GET_PAYMENT_WAITING,
  GET_PAYMENT_SUCCESS,
  GET_PAYMENT_FAILURE,
} from './actions';

const initialState = {
  getPayment: {
    status: 'INIT',
    payment: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_WAITING:
      return update(state, {
        getPayment: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_PAYMENT_SUCCESS:
      return update(state, {
        getPayment: {
          status: { $set: 'SUCCESS' },
          payment: { $set: action.payment },
        },
      });
    case GET_PAYMENT_FAILURE:
      return update(state, {
        getPayment: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
};
