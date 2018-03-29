import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerSuccess } from '../../redux/user.redux';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/Logo/logo';
@connect(state => ({ user: state.user }), {
  registerSuccess
})
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: ''
    };
  }

  render() {
    const { user, registerSuccess, history } = this.props;
    const { userName, pwd } = this.state;
    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              onChange={value => {
                this.setState({ user: value });
              }}
            >
              username:
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={value => {
                this.setState({ pwd: value });
              }}
            >
              password:
            </InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={() => {}} type="primary">
            Login
          </Button>
          <WhiteSpace />
          <Button onClick={() => history.push('/register')} type="primary">
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
