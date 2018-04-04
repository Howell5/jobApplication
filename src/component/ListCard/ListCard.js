import React, { Component } from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';

class ListCard extends Component {
  render() {
    return (
      <div>
        <WhiteSpace />
        {this.props.userList.map(
          v =>
            v.avatar ? (
              <WingBlank>
                <Card>
                  <Card.Header
                    title={v.name}
                    thumb={require(`../public/images/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                  />
                  <Card.Body>
                    {v.desc.split('\n').map(d => <div>{d}</div>)}
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
