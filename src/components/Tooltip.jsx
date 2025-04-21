import React, { Component } from 'react';
import './Tooltip.css';

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  handleMouseEnter = () => {
    this.setState({ isVisible: true });
  }

  handleMouseLeave = () => {
    this.setState({ isVisible: false });
  }

  render() {
    const { children, text } = this.props;
    const { isVisible } = this.state;

    return (
      <span 
        className="tooltip-container"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children}
        {isVisible && (
          <span className="tooltip-text">
            {text}
          </span>
        )}
      </span>
    );
  }
}

export default Tooltip; 