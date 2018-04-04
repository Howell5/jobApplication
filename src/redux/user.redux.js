import axios from 'axios';
import cookies from 'browser-cookies';
import { getRedirectPath } from '../util';

//store
const ERROR_MESSAGE = 'ERROR_MESSAGE';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';

const initialState = {
  name: '',
  message: '',
  type: '',
  redirectTo: ''
};

//reducer
export function user(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        message: '',
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

//action creater
const errMessage = message => {
  return {
    message,
    type: ERROR_MESSAGE
  };
};
const loadData = data => {
  return {
    type: LOAD_DATA,
    payload: data
  };
};
const authSuccess = data => {
  return { type: AUTH_SUCCESS, payload: data };
};

const register = ({ name, pwd, repeatPwd, type }) => {
  if (!user || !pwd) {
    console.log('user pwd is null');
    return errMessage('用户名密码不能为空');
  }
  if (pwd !== repeatPwd) {
    return errMessage('前后两次密码不一致');
  }
  return dispatch => {
    console.log('axios post user');
    axios
      .post('/user', {
        pwd,
        type,
        name
      })
      .then(res => {
        if (res.status === 200 && res.data.statusCode === 200) {
          console.log('did it dispatch to RS');
          dispatch(authSuccess({ name, pwd, type }));
        }
      });
  };
};
const login = ({ name, pwd }) => {
  if (!name || !pwd) {
    return errMessage('用户名或密码不能为空');
  }
  return dispatch => {
    axios.post('user/login', { name, pwd }).then(res => {
      if (res.status === 200 && res.data.statusCode === 200) {
        dispatch(authSuccess(res.data.data));
      }
    });
  };
};

const update = data => dispatch => {
  axios.post('/user/update', data).then(res => {
    if (res.status === 200 && res.data.statusCode === 200) {
      dispatch(authSuccess(res.data.data));
    }
  });
};

const logout = data => {
  cookies.erase('userid');
};

export { register, loadData, login, update, logout };
