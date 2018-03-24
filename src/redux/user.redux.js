const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

const initialState = {
  isAuth: false,
  user: '',
  message: '',
  type: '',
  
}
export function user(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: 'success',
        isAuth: true,
      };
    default:
      return state;
  }
}
export function registerSuccess() {
  return {type: REGISTER_SUCCESS}
}
// export function register(type) {
  
// }