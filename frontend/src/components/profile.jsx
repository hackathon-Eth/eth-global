import ProgressBar from "./progress";

import React from 'react';

class ProfileCard extends React.Component {
  render() {
    const { name, percentage } = this.props;

    return (
      <div className="profile-card" style={{width:"20rem"}}>
        <div className="profile-details">
          <h2 className="dna-name">{name}</h2>
          <ProgressBar percentage={percentage}/>
        </div>
        <button className="contact-button">Nudge for contact!</button>
      </div>
    );
  }
}

export default ProfileCard;
