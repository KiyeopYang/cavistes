import update from 'react-addons-update';
import {
  GET_SHOP_WAITING,
  GET_SHOP_SUCCESS,
  GET_SHOP_FAILURE,
} from './actions';

const initialState = {
  getShop: {
    status: 'INIT',
    shop: undefined,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHOP_WAITING:
      return update(state, {
        getShop: {
          status: { $set: 'WAITING' },
        },
      });
    case GET_SHOP_SUCCESS:
      return update(state, {
        getShop: {
          status: { $set: 'SUCCESS' },
          shop: { $set: action.shop },
        },
      });
    case GET_SHOP_FAILURE:
      return update(state, {
        getShop: {
          status: { $set: 'FAILURE' },
          shop: { $set: undefined },
        },
      });
    default:
      return state;
  }
};
