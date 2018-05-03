/* global fetch */
import loader from '../../../../data/loader/actions';

export const GET_PAYMENT_WAITING = 'PaymentManager/data/payment/GET_PAYMENT_WAITING';
export const GET_PAYMENT_SUCCESS = 'PaymentManager/data/payment/GET_PAYMENT_SUCCESS';
export const GET_PAYMENT_FAILURE = 'PaymentManager/data/payment/GET_PAYMENT_FAILURE';
const getPaymentWaiting = () => {
  return {
    type: GET_PAYMENT_WAITING,
  };
};
const getPaymentSuccess = (payment) => {
  return {
    type: GET_PAYMENT_SUCCESS,
    payment,
  };
};
const getPaymentFailure = (error) => {
  return {
    type: GET_PAYMENT_FAILURE,
    error,
  };
};
export const getPaymentRequest = () => {
  return (dispatch) => {
    dispatch(loader(true));
    dispatch(getPaymentWaiting());
    return fetch(`/api/payment`, {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
    })
      .then((res) => {
        dispatch(loader(false));
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((res) => {
        if (res.data) {
          return dispatch(getPaymentSuccess(res.data));
        }
        return dispatch(getPaymentFailure({
          error: null,
          message: 'response에 data 프로퍼티가 없습니다.'
        }));
      })
      .catch(e => dispatch(getPaymentFailure(e)));
  };
};
