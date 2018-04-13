import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/user.redux';
import AuthForm from '../../component/HOC/AuthForm';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/Logo/logo';

@connect(state => state.user, {
  login
})
@AuthForm
class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.login(this.props.wrapState);
  }

  render() {
    const { redirectTo } = this.props;
    const { pathname } = this.props.history;
    return (
      <div>
        {redirectTo && pathname !== redirectTo ? (
          <Redirect to={redirectTo} />
        ) : null}
        <Logo />
        <WingBlank>
          <List>
            <InputItem onChange={val => this.props.handleChange('name', val)}>
              username:
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={val => this.props.handleChange('pwd', val)}
            >
              password:
            </InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">
            Login
          </Button>
          <WhiteSpace />
          <Button
            onClick={() => this.props.history.push('/register')}
            type="primary"
          >
            Register
          </Button>
        </WingBlank>
      </div>
    );
  }
}

// export default connect(
//   mapStateToProps,
//   actionCreator
// )(Login);
export default Login;
