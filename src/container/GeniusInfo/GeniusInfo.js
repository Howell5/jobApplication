import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AvataSelector from '../../component/AvataSelector/AvataSelector';
import { update } from '../../redux/user.redux';
@connect(state => state.user, { update })
class GeniusInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      title: '',
      desc: ''
    };
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    const redirect = this.props.redirectTo;
    const pathname = this.props.location;
    return (
      <div>
        {redirect && redirect !== pathname ? <Redirect to={redirect} /> : null}
        <NavBar mode="dark">牛人完善页面</NavBar>
        <AvataSelector
          selectAvatar={imagename => {
            this.setState({
              avatar: imagename
            });
          }}
        />
        <InputItem onChange={v => this.onChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title="个人简介"
        />
        <Button
          onClick={() => {
            this.props.update(this.state);
          }}
          type="primary"
        >
          保存
        </Button>
      </div>
    );
  }
}

export default GeniusInfo;
