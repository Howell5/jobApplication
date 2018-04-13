import axios from '../config/axios';

const LOAD_LIST_USER = 'LOAD_LIST_USER';

const initialState = {
  userList: []
};

const chatuser = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LIST_USER:
      return { ...state, userList: action.payload };
    default:
      return state;
  }
};

const userList = data => {
  return { type: LOAD_LIST_USER, payload: data };
};

const getListCard = type => {
  return dispatch => {
    axios.get(`/user/list/${type}`).then(res => {
      if (res.status === 200 && res.data.statusCode === 200) {
        dispatch(userList(res.data.data));
      }
    });
  };
};

export { getListCard, chatuser };
