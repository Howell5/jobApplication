import React, { Component } from 'react';
import cookies from 'browser-cookies';
import { Result, List, Button, WhiteSpace, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { logout } from '../../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(state => state.user, { logout })
class UserCenter extends Component {
  constructor(props) {
    super(props);
    this.logoutSubmit = this.logoutSubmit.bind(this);
  }

  logoutSubmit() {
    console.log('cookies', document.cookie);
    const alert = Modal.alert;
    alert('登出', 'Are you sure???', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel'),
        style: 'default'
      },
      {
        text: 'OK',
        onPress: () => {
          cookies.erase('userid');
          this.props.logout();
        }
      }
    ]);
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
              src={require(`../../../../public/images/${props.avatar}.png`)}
              style={{ width: 50 }}
              alt=""
            />
          }
          title={props.name}
          message={props.type === 'boss' ? props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {props.title}
            {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
            {props.money ? <Brief>薪资:{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <Button onClick={this.logoutSubmit}>退出登录</Button>
      </div>
    ) : (
      <Redirect to={props.redirectTo} />
    );
  }
}

export default UserCenter;
