import React, { Component } from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class ListCard extends Component {
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`);
  }
  render() {
    return (
      <div>
        <WhiteSpace />
        {this.props.userList.map(
          v =>
            v.avatar ? (
              <WingBlank key={v._id}>
                <Card onClick={() => this.handleClick(v)}>
                  <Card.Header
                    title={v.name}
                    thumb={require(`../../../public/images/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                  />
                  <Card.Body>
                    {v.desc
                      .split('\n')
                      .map((d, idx) => <div key={idx}>{d}</div>)}
                  </Card.Body>
                </Card>
              </WingBlank>
            ) : null
        )}
      </div>
    );
  }
}

export default ListCard;
