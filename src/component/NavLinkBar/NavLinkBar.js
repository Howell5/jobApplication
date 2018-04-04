import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class NavLinkBar extends Component {
  render() {
    const { pathname } = this.props.location;
    const navList = this.props.data.filter(v => !v.hide);
    return (
      <div>
        <TabBar>
          {navList.map(v => (
            <TabBar.Item
              key={v.pathname}
              title={v.title}
              icon={{ uri: require(`./images/${v.icon}.png`) }}
              selectedIcon={{ uri: require(`./images/${v.icon}-active.png`) }}
              selected={pathname === v.pathname}
              onPress={() => this.props.history.push(v.pathname)}
            />
          ))}
        </TabBar>
      </div>
    );
  }
}

export default NavLinkBar;
