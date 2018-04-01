import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/user.redux';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/Logo/logo';
@connect(state => state.user, {
  login
})
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pwd: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  handleLogin() {
    this.props.login(this.state);
  }

  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            <InputItem onChange={val => this.handleChange('name', val)}>
              username:
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={val => this.handleChange('pwd', val)}
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
