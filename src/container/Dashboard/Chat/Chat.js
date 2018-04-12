import React, { Component } from 'react';
import { InputItem, List, Icon, NavBar, Grid } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import {
  sendMsg,
  recvMsg,
  getMsgList,
  readMsg
} from '../../../redux/chat.redux';
import { getChatid } from '../../../util';

@connect(state => state, { sendMsg, recvMsg, getMsgList, readMsg })
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msgs: [],
      showEmoji: false
    };
  }
  handleSubmit({ targetUserId, sourceUserId, text }) {
    // this.setState({
    //   text: '',
    //   msgs: [...this.state.msgs, ]
    // });
    this.setState({
      text: ''
    });
    this.props.sendMsg({ targetUserId, sourceUserId, text });
  }
  componentDidMount() {
    if (!this.props.chat || !this.props.chat.chatMsg.length) {
      this.props.recvMsg();
      this.props.getMsgList();
    }
  }
  componentWillUnmount() {
    this.props.readMsg(this.props.match.params.user);
  }
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  renderChatItem(v, users, userid) {
    const Item = List.Item;
    const sourceUserId = this.props.user._id;
    const isSourceUser = sourceUserId === userid;
    const avatar = users[userid].avatar;
    return (
      <Item
        key={v._id}
        className={isSourceUser ? 'chat-me' : null}
        thumb={
          isSourceUser
            ? null
            : require(`../../../../public/images/${avatar}.png`)
        }
        wrap={true}
        extra={
          isSourceUser ? (
            <img
              src={require(`../../../../public/images/${
                users[sourceUserId].avatar
              }.png`)}
              alt=""
            />
          ) : null
        }
      >
        {v.content}
      </Item>
    );
  }

  render() {
    const targetUserId = this.props.match.params.user;
    const sourceUserId = this.props.user._id;
    const text = this.state.text;
    const users = this.props.chat.users;

    if (Object.keys(users).length === 0) {
      return null;
    }
    const chatid = getChatid(targetUserId, sourceUserId);
    const chatMsg = this.props.chat.chatMsg.filter(v => v.chatid === chatid);
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({ text: v }));

    return (
      <div id="chat-page">
        <NavBar
          className="chat-nav"
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[targetUserId].name}
        </NavBar>
        <List className="chat-list">
          <QueueAnim delay={50}>
            {chatMsg.map(v => {
              return v.from === targetUserId
                ? this.renderChatItem(v, users, targetUserId)
                : this.renderChatItem(v, users, sourceUserId);
              // (
              // <Item
              //   key={v._id}
              //   className="chat-me"
              //   wrap={true}
              //   extra={
              //     <img
              //       src={require(`../../../../public/images/${
              //         users[sourceUserId].avatar
              //       }.png`)}
              //       alt=""
              //     />
              //   }
              // >
              //   {v.content}
              // </Item>
              // );
            })}
          </QueueAnim>
        </List>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder={'请输入'}
              value={this.state.text}
              onChange={val => this.setState({ text: val })}
              extra={
                <div>
                  <span
                    role="img"
                    aria-label="smile"
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      });
                      this.fixCarousel();
                    }}
                  >
                    😀
                  </span>
                  <span
                    onClick={() =>
                      this.handleSubmit({ targetUserId, sourceUserId, text })
                    }
                  >
                    发送
                  </span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji && (
            <Grid
              data={emoji}
              isCarousel={true}
              carouselMaxRow={4}
              columnNum={9}
              onClick={val => {
                this.setState({
                  text: this.state.text + val.text
                });
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
