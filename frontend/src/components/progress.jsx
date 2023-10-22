import React, { useEffect, useState } from 'react';

class ProgressBar extends React.Component {
  calculateHue(percentage) {
    const hue = (percentage / 100) * 120;
    return hue;
  }

  render() {
    const { percentage } = this.props;
    const hue = this.calculateHue(percentage);
    const barColor = `hsl(${hue}, 100%, 50%)`;
    const barStyle = {
      width: `${percentage}%`,
      backgroundColor: barColor,
      transition: 'width 2s' // Add this line
    };

    return (
      <div>
        <div id="myProgress">
          <div id="myBar" style={barStyle}>
            <div id="label">{percentage}%</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
