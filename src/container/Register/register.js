import React, { Component } from 'react';
import { InputItem, WhiteSpace, Radio, Button, List } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/Logo/logo';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import AuthForm from '../../component/HOC/AuthForm';

@connect(state => state.user, { register })
@AuthForm
class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount() {
    this.props.handleChange('type', 'genius');
  }

  handleRegister() {
    return this.props.register(this.props.wrapState);
  }

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <List>
          {this.props.message ? (
            <p className="error-msg" style={{ color: 'red' }}>
              {this.props.message}
            </p>
          ) : null}
          <InputItem onChange={v => this.props.handleChange('name', v)}>
            用户名
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.props.handleChange('pwd', v)}
          >
            密码
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.props.handleChange('repeatPwd', v)}
          >
            确认密码
          </InputItem>
          <WhiteSpace />
          <RadioItem
            checked={this.props.wrapState.type === 'genius'}
            onChange={() => this.props.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.props.wrapState.type === 'boss'}
            onChange={() => this.props.handleChange('type', 'boss')}
          >
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={() => this.props.history.push('login')}
          >
            登录
          </Button>
        </List>
      </div>
    );
  }
}

export default Register;
