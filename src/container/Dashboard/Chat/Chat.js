import React, { Component } from 'react';
import { InputItem, List, Icon, NavBar, Grid } from 'antd-mobile';
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

  render() {
    const targetUserId = this.props.match.params.user;
    const sourceUserId = this.props.user._id;
    const text = this.state.text;
    const users = this.props.chat.users;

    const Item = List.Item;
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
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[targetUserId].name}
        </NavBar>
        {chatMsg.map(v => {
          return v.from === targetUserId ? (
            <List key={v._id}>
              <Item
                thumb={require(`../../../../public/images/${
                  users[targetUserId].avatar
                }.png`)}
              >
                {v.content}
              </Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item
                className="chat-me"
                extra={
                  <img
                    src={require(`../../../../public/images/${
                      users[sourceUserId].avatar
                    }.png`)}
                    alt=""
                  />
                }
              >
                {v.content}
              </Item>
            </List>
          );
        })}
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
