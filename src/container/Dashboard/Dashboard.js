import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavLinkBar from '../../component/NavLinkBar/NavLinkBar';
import Boss from './Boss/Boss';
import Genius from './Genius/Genius';
import UserCenter from './UserCenter/UserCenter';
import Message from './Message/Message';
import { recvMsg, getMsgList } from '../../redux/chat.redux';

@connect(state => state, { recvMsg, getMsgList })
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  render() {
    const user = this.props.user;
    const { pathname } = this.props.location;
    const navList = [
      {
        pathname: '/boss',
        text: '牛人',
        title: '牛人列表',
        icon: 'boss',
        hide: user.type === 'genius',
        component: Boss
      },
      {
        pathname: '/genius',
        text: 'Boss',
        title: '职位列表',
        icon: 'job',
        hide: user.type === 'boss',
        component: Genius
      },
      {
        pathname: '/message',
        text: '消息',
        title: '消息列表',
        icon: 'msg',
        component: Message
      },
      {
        pathname: '/me',
        text: '我',
        title: '个人中心',
        icon: 'user',
        component: UserCenter
      }
    ];
    const navFilter = navList.find(v => v.pathname === pathname);
    return navFilter ? (
      <div>
        <NavBar className="fixd-header">{navFilter && navFilter.title}</NavBar>
        <div className="dash-center">
          <Switch>
            {navList.map(v => (
              <Route
                key={v.pathname}
                path={v.pathname}
                component={v.component}
              />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} chat={this.props.chat} />
      </div>
    ) : (
      <Redirect to={`/${user.type}`} />
    );
  }
}

export default Dashboard;
