import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';
import AvataSelector from '../../component/AvataSelector/AvataSelector';

@connect(state => state.user, { update })
class BossInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      title: '',
      company: '',
      money: '',
      desc: ''
    };
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  render() {
    return (
      <div>
        {/* {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null} */}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <AvataSelector
          selectAvatar={imagename => {
            this.setState({
              avatar: imagename
            });
          }}
        />
        <InputItem onChange={v => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange('money', v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title="职位要求"
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

export default BossInfo;
