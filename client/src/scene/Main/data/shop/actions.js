/* global fetch */
import * as loader from '../../../../data/loader/actions';

export const GET_SHOP_WAITING = 'Main/data/shop/GET_SHOP_WAITING';
export const GET_SHOP_SUCCESS = 'Main/data/shop/GET_SHOP_SUCCESS';
export const GET_SHOP_FAILURE = 'Main/data/shop/GET_SHOP_FAILURE';

const getShopWaiting = () => {
  return {
    type: GET_SHOP_WAITING,
  };
};
const getShopSuccess = (shop) => {
  return {
    type: GET_SHOP_SUCCESS,
    shop,
  };
};
const getShopFailure = (error) => {
  return {
    type: GET_SHOP_FAILURE,
    error,
  };
};
export const getShopRequest = () => {
  return (dispatch) => {
    dispatch(loader.on());
    dispatch(getShopWaiting());
    return fetch('/api/shop', {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
    })
      .then((res) => {
        dispatch(loader.off());
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(getShopSuccess(res.data));
        }
        return dispatch(getShopFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getShopFailure(e)));
  };
};
