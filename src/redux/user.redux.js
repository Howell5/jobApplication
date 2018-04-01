import axios from 'axios';
import { getRedirectPath } from '../util';

//store
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MESSAGE = 'ERROR_MESSAGE';
const LOAD_DATA = 'LOAD_DATA';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const initialState = {
  isAuth: false,
  name: '',
  message: '',
  type: '',
  redirectTo: ''
};

//reducer
export function user(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: '',
        isAuth: true,
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        isAuth: false,
        message: action.message
      };
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
    case LOGIN_SUCCESS:
      console.log('login success', action, action.payload);
      return {
        ...state,
        redirectTo: getRedirectPath(action.payload),
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
const registerSuccess = data => {
  return { type: REGISTER_SUCCESS, payload: data };
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
          dispatch(registerSuccess({ name, pwd, type }));
        }
      });
  };
};

const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

const login = ({ name, pwd }) => {
  if (!name || !pwd) {
    return errMessage('用户名或密码不能为空');
  }
  return dispatch => {
    axios.post('user/login', { name, pwd }).then(res => {
      if (res.status === 200 && res.data.statusCode === 200) {
        dispatch(loginSuccess(res.data.data));
      }
    });
  };
};

export { register, loadData, login };
