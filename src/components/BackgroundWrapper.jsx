import React, { Component } from 'react'
import './BackgroundWrapper.css'

class BackgroundWrapper extends Component {
  render() {
    const { children } = this.props;
    
    return (
      <div className="background-wrapper">
        {children}
      </div>
    )
  }
}

export default BackgroundWrapper 