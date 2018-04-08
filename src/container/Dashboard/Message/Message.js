import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(state => state)
class Message extends Component {
  getLastChat(arr) {
    arr.sort((a, b) => a.create_time - b.create_time);
    return arr[arr.length - 1];
  }
  render() {
    console.log(this.props);
    if (!this.props.chat.chatMsg.length) {
      return null;
    }
    const userid = this.props.user._id;
    const users = this.props.chat.users;
    const Item = List.Item;
    const Brief = Item.Brief;
    const msgGroup = this.props.chat.chatMsg.reduce((acc, cur) => {
      acc[cur.chatid] = acc[cur.chatid] ? acc[cur.chatid] : [];
      acc[cur.chatid].push(cur);
      return acc;
    }, {});
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLastChat(a);
      const b_last = this.getLastChat(b);
      return b_last.create_time - a_last.create_time;
    });
    return (
      <div>
        {chatList.map(v => {
          const lastChatMsg = this.getLastChat(v);
          const targetId =
            lastChatMsg.from === userid ? lastChatMsg.to : lastChatMsg.from;
          const unreadNum = v.filter(msg => !msg.read && msg.to === userid)
            .length;
          return (
            <List key={lastChatMsg._id}>
              <Item
                thumb={require(`../../../../public/images/${
                  users[targetId].avatar
                }.png`)}
                arrow="horizontal"
                onClick={() => this.props.history.push(`/chat/${targetId}`)}
                extra={<Badge text={unreadNum} />}
              >
                {lastChatMsg.content}
                <Brief>{users[targetId].name}</Brief>
              </Item>
            </List>
          );
        })}
      </div>
    );
  }
}

export default Message;
