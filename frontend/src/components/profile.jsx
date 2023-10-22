import ProgressBar from "./progress";
import React from 'react';

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nudgeSent: false,
    };
  }

  handleNudge = () => {
    if (!this.state.nudgeSent) {
      // You can perform the nudge action here
      // For example, set a flag in your backend or perform any other relevant action

      // Once the nudge is sent, update the state to disable the button
      this.setState({ nudgeSent: true });
    } else {
      alert("Nudge already sent!");
    }
  }

  render() {
    const { name, percentage } = this.props;
    const { nudgeSent } = this.state;

    return (
      <div className="profile-card" style={{ width: "20rem" }}>
        <div className="profile-details">
          <h2 className="dna-name">{name}</h2>
          <ProgressBar percentage={percentage} />
        </div>
        <button
          className="contact-button"
          onClick={this.handleNudge}
          disabled={nudgeSent} // Disable the button if nudge has been sent
        >
          {nudgeSent ? "Nudge Sent" : "Nudge for contact!"}
        </button>
      </div>
    );
  }
}

export default ProfileCard;
