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
    console.log('this.props in the Login', this.props);
    const { user, registerSuccess } = this.props;
    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem />
            <WhiteSpace />
            <InputItem />
            <WhiteSpace />
            <Button type="primary">Login</Button>
            <Button type="primary">Register</Button>
          </List>
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
