import React, { Component } from 'react';
import { List, Grid } from 'antd-mobile';

class AvataSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    if (this.state.elm) {
      return (
        <div>
          <span>已选择头像: </span>
          <img
            style={{ width: '20px' }}
            src={this.state.elm.icon}
            alt="avata"
          />
        </div>
      );
    } else {
      return <span>请选择头像</span>;
    }
  }

  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(v => ({
        icon: require(`../public/images/${v}.png`),
        text: v
      }));
    return (
      <div>
        <List renderHeader={this.renderHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={elm => {
              this.setState({ elm });
              this.props.selectAvatar(elm.text);
            }}
          />
        </List>
      </div>
    );
  }
}

export default AvataSelector;
