import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvataSelector from '../../component/AvataSelector/AvataSelector';
class GeniusInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: ''
    };
  }

  render() {
    return (
      <div>
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
          title="个人见解"
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
