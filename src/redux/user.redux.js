const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MESSAGE = 'ERROR_MESSAGE';

const initialState = {
  isAuth: false,
  user: '',
  message: '',
  type: ''
};
export function user(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: 'success',
        isAuth: true
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        isAuth: false,
        message: action.message
      };
    default:
      return state;
  }
}

const errMessage = message => {
  return {
    message,
    type: ERROR_MESSAGE
  };
};
export function registerSuccess() {
  return { type: REGISTER_SUCCESS };
}
export function register({ user, pwd, repeatPwd, type }) {
  if (!user || !pwd) {
    return errMessage('用户名密码不能为空');
  }
  if (pwd !== repeatPwd) {
    return errMessage('前后两次密码不一致');
  }
}
