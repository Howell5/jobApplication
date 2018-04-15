import React from 'react';
import './logo.css';
class Logo extends React.Component {
  render() {
    const logoImg = require('./job.png');
    return (
      <div className="logo-container">
        <img src={logoImg} alt="LOGO" />
      </div>
    );
  }
}

export default Logo;
