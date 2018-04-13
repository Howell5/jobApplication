import io from 'socket.io-client';
import axios from '../config/axios';

const socket = io('ws://localhost:9090');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
  chatMsg: [],
  users: {},
  unread: 0
};

const chat = (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatMsg: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter(
          msg => !msg.read && msg.to === action.payload.userid
        ).length
      };
    case MSG_RECV:
      const n = action.payload.to === action.userid ? 1 : 0;
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.payload],
        unread: state.unread + n
      };
    case MSG_READ:
      const { num, from } = action.payload;
      return {
        ...state,
        chatMsg: state.chatMsg.map(v => ({
          ...v,
          read: from === v.from ? true : v.read
        })),
        unread: state.unread - num
      };
    default:
      return state;
  }
};

//action creater
const msgList = (msgs, users, userid) => {
  return { type: MSG_LIST, payload: { msgs, users, userid } };
};
const msgRecv = (doc, userid) => {
  return { userid, type: MSG_RECV, payload: doc };
};

const msgRead = ({ from, to, num }) => {
  return { type: MSG_READ, payload: { from, to, num } };
};

const getMsgList = () => {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then(res => {
      if (res.status === 200 && res.data.statusCode === 200) {
        dispatch(msgList(res.data.data, res.data.users, getState().user._id));
      }
    });
  };
};

const sendMsg = ({ targetUserId, sourceUserId, text }) => {
  return dispatch => {
    socket.emit('sendmsg', { targetUserId, sourceUserId, text });
  };
};

const recvMsg = () => {
  return (dispatch, getState) => {
    socket.on('recvmsg', doc => {
      dispatch(msgRecv(doc, getState().user._id));
    });
  };
};

const readMsg = from => {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', { from }).then(res => {
      const userid = getState().user._id;
      if (res.status === 200 && res.data.statusCode === 200) {
        dispatch(msgRead({ userid, from, num: res.data.num }));
      }
    });
  };
};
export { chat, getMsgList, sendMsg, recvMsg, readMsg };
