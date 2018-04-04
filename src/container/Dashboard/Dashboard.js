import React, { Component } from 'react';
import { NavBar, TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NavLinkBar from '../../component/NavLinkBar/NavLinkBar';
import Boss from '../Boss/Boss';
import Genius from '../Genius/Genius';
import UserCenter from '../UserCenter/UserCenter';

const Message = () => <div>Message</div>;

@connect(state => state)
class Dashboard extends Component {
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
    return (
      <div>
        <NavBar className="fixd-header">
          {navList.find(v => v.pathname === pathname).title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
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
        <NavLinkBar data={navList} />
      </div>
    );
  }
}

export default Dashboard;
