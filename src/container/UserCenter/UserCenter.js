import React, { Component } from 'react';
import { Result, List, Brief, WhiteSpace, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { logout } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(state => state.user, { logout })
class UserCenter extends Component {
  constructor(props) {
    super(props);
    this.logoutSubmit = this.logoutSubmit.bind(this);
  }

  logoutSubmit() {
    console.log('changggggggg');
    logout();
  }
  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return props.name ? (
      <div>
        <Result
          img={
            <img
              src={require(`../../component/public/images/${props.avatar}.png`)}
              style={{ width: 50 }}
              alt=""
            />
          }
          title={props.name}
          message={props.type === 'boss' ? props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item
            multipleLine
            onClick={() => {
              console.log('iiiiiiiiii');
            }}
          >
            {props.title}
            {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
            {props.money ? <Brief>薪资:{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item
            onClick={() => {
              console.log('iiiiiiiiiii');
            }}
          >
            退出登录
          </Item>
        </List>
      </div>
    ) : null;
  }
}

export default UserCenter;
