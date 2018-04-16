/* global fetch */
import cookie from '../../modules/cookie';
// 로그인
export const GET_WAITING = 'Main/data/account/GET_WAITING';
export const GET_SUCCESS = 'Main/data/account/GET_SUCCESS';
export const GET_FAILURE = 'Main/data/account/GET_FAILURE';
const getWaiting = () => {
  return {
    type: GET_WAITING,
  };
};
const getSuccess = (data) => {
  return {
    type: GET_SUCCESS,
    data,
  };
};
const getFailure = (error) => {
  return {
    type: GET_FAILURE,
    error,
  };
};
export const getRequest = () => {
  return (dispatch) => {
    dispatch(getWaiting());
    const token = cookie.get('account') || 'null';
    return fetch('/api/account', {
      method: 'GET',
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(getSuccess(data));
        }
        return dispatch(getFailure({
          error: null,
          message: 'NO DATA'
        }));
      })
      .catch(e => dispatch(getFailure(e)));
  };
};

// 로그아웃
export const logout = () => {
  return (dispatch) => {
    return dispatch(getFailure({
      error: null,
      message: 'LOGOUT',
    }));
  };
};

export const LOGIN_WAITING = 'Main/data/account/LOGIN_WAITING';
export const LOGIN_SUCCESS = 'Main/data/account/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'Main/data/account/LOGIN_FAILURE';
const loginWaiting = () => {
  return {
    type: LOGIN_WAITING,
  };
};
const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
};
const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};
export const loginRequest = ({ email, password }) => {
  return (dispatch) => {
    dispatch(loginWaiting());
    return fetch('/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(loginSuccess(data));
        }
        return dispatch(loginFailure({
          error: null,
          message: 'NO DATA'
        }));
      })
      .catch(e => dispatch(loginFailure(e)));
  };
};

export const MAKE_ACCOUNT_WAITING = 'Main/data/account/MAKE_ACCOUNT_WAITING';
export const MAKE_ACCOUNT_SUCCESS = 'Main/data/account/MAKE_ACCOUNT_SUCCESS';
export const MAKE_ACCOUNT_FAILURE = 'Main/data/account/MAKE_ACCOUNT_FAILURE';
const makeAccountWaiting = () => {
  return {
    type: MAKE_ACCOUNT_WAITING,
  };
};
const makeAccountSuccess = (data) => {
  return {
    type: MAKE_ACCOUNT_SUCCESS,
    data,
  };
};
const makeAccountFailure = (error) => {
  return {
    type: MAKE_ACCOUNT_FAILURE,
    error,
  };
};
export const makeAccountRequest = ({ email, password }) => {
  return (dispatch) => {
    dispatch(makeAccountWaiting());
    return fetch('/api/account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(makeAccountSuccess(data));
        }
        return dispatch(makeAccountFailure({
          error: null,
          message: 'NO DATA'
        }));
      })
      .catch(e => dispatch(makeAccountFailure(e)));
  };
};

export const SET_NAME_WAITING = 'Main/data/account/SET_NAME_WAITING';
export const SET_NAME_SUCCESS = 'Main/data/account/SET_NAME_SUCCESS';
export const SET_NAME_FAILURE = 'Main/data/account/SET_NAME_FAILURE';
const setNameWaiting = () => {
  return {
    type: SET_NAME_WAITING,
  };
};
const setNameSuccess = (data) => {
  return {
    type: SET_NAME_SUCCESS,
    data,
  };
};
const setNameFailure = (error) => {
  return {
    type: SET_NAME_FAILURE,
    error,
  };
};
export const setNameRequest = (name) => {
  return (dispatch) => {
    dispatch(setNameWaiting());
    const token = cookie.get('account') || 'null';
    return fetch('/api/account/name', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(setNameSuccess(data));
        }
        return dispatch(setNameFailure({
          error: null,
          message: 'NO DATA'
        }));
      })
      .catch(e => dispatch(setNameFailure(e)));
  };
};

export const SET_SIZE_WAITING = 'Main/data/account/SET_SIZE_WAITING';
export const SET_SIZE_SUCCESS = 'Main/data/account/SET_SIZE_SUCCESS';
export const SET_SIZE_FAILURE = 'Main/data/account/SET_SIZE_FAILURE';
const setSizeWaiting = () => {
  return {
    type: SET_SIZE_WAITING,
  };
};
const setSizeSuccess = (data) => {
  return {
    type: SET_SIZE_SUCCESS,
    data,
  };
};
const setSizeFailure = (error) => {
  return {
    type: SET_SIZE_FAILURE,
    error,
  };
};
export const setSizeRequest = (size) => {
  return (dispatch) => {
    dispatch(setSizeWaiting());
    const token = cookie.get('account') || 'null';
    return fetch('/api/account/size', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        size,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(setSizeSuccess(data));
        }
        return dispatch(setSizeFailure({
          error: null,
          message: 'NO DATA'
        }));
      })
      .catch(e => dispatch(setSizeFailure(e)));
  };
};

export const SET_ROUTINE_WAITING = 'Main/data/account/SET_ROUTINE_WAITING';
export const SET_ROUTINE_SUCCESS = 'Main/data/account/SET_ROUTINE_SUCCESS';
export const SET_ROUTINE_FAILURE = 'Main/data/account/SET_ROUTINE_FAILURE';
const setRoutineWaiting = () => {
  return {
    type: SET_ROUTINE_WAITING,
  };
};
const setRoutineSuccess = (data) => {
  return {
    type: SET_ROUTINE_SUCCESS,
    data,
  };
};
const setRoutineFailure = (error) => {
  return {
    type: SET_ROUTINE_FAILURE,
    error,
  };
};
export const setRoutineRequest = (routine) => {
  return (dispatch) => {
    dispatch(setRoutineWaiting());
    const token = cookie.get('account') || 'null';
    return fetch('/api/account/routine', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        routine,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(setRoutineSuccess(data));
        }
        return dispatch(setRoutineFailure({
          error: null,
          message: 'NO DATA'
        }));
      })
      .catch(e => dispatch(setRoutineFailure(e)));
  };
};

export const REMOVE_WAITING = 'Main/data/account/REMOVE_WAITING';
export const REMOVE_SUCCESS = 'Main/data/account/REMOVE_SUCCESS';
export const REMOVE_FAILURE = 'Main/data/account/REMOVE_FAILURE';
const removeWaiting = () => {
  return {
    type: REMOVE_WAITING,
  };
};
const removeSuccess = () => {
  return {
    type: REMOVE_SUCCESS,
  };
};
const removeFailure = (error) => {
  return {
    type: REMOVE_FAILURE,
    error,
  };
};
export const removeRequest = () => {
  return (dispatch) => {
    dispatch(removeWaiting());
    const token = cookie.get('account') || 'null';
    return fetch('/api/account/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(removeSuccess(data));
        }
        return dispatch(removeFailure({
          error: null,
          message: 'NO DATA'
        }));
      })
      .catch(e => dispatch(removeFailure(e)));
  };
};
