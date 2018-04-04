import React, { Component } from 'react';
import { getListCard } from '../../redux/chatuser.redux';
import { connect } from 'react-redux';
import ListCard from '../../component/ListCard/ListCard';

@connect(state => state.chatuser, { getListCard })
class Genius extends Component {
  componentDidMount() {
    this.props.getListCard('boss');
    console.log('gooooooooo', this);
  }

  render() {
    return (
      <div>
        <ListCard userList={this.props.userList} />
      </div>
    );
  }
}

export default Genius;
