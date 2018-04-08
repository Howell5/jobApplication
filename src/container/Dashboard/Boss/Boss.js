import React, { Component } from 'react';
import { getListCard } from '../../../redux/chatuser.redux';
import { connect } from 'react-redux';
import ListCard from '../../../component/ListCard/ListCard';

@connect(state => state.chatuser, { getListCard })
class Boss extends Component {
  componentDidMount() {
    this.props.getListCard('genius');
  }

  render() {
    return (
      <div>
        <ListCard userList={this.props.userList} />
      </div>
    );
  }
}

export default Boss;
