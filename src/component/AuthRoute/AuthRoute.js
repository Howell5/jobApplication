import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { loadData } from '../../redux/user.redux';

@connect(state => state.user, { loadData })
@withRouter
class AuthRoute extends Component {
  componentDidMount() {
    console.log('this.props.history', this.props.history);
    const publicPath = ['/register', '/login'];
    const { pathname } = this.props.history.location;
    const exist = publicPath.includes(pathname);
    if (exist) {
      return null;
    }

    // 检测是否可以使用 cookie 登录
    axios.get('/user/cookieInfo').then(res => {
      if (res.status === 200) {
        if (res.data.statusCode === 200) {
          console.log('this.status', res);
          this.props.loadData(res.data.data);
        } else {
          this.props.history.push('/login');
        }
      }
    });
  }
  render() {
    return null;
  }
}

export default AuthRoute;
