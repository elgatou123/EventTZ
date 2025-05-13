import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ReservationSuccess.css";

const ReservationSuccess = () => {
  const { inviteLink } = useParams();
  const inviteUrl = `${window.location.origin}/invite/${inviteLink}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    alert("Invite link copied to clipboard.");
  };

  const shareInvite = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Event Invitation",
          text: "I'd like to invite you to this event!",
          url: inviteUrl,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="reservation-page">
      <Navbar />

      <main className="reservation-main">
        <div className="reservation-wrapper">
          <div className="reservation-card">
            <div className="reservation-card-header">
              <div className="success-icon">
                <i className="fa-solid fa-check check-icon"></i>
              </div>
              <h2 className="reservation-title">Reservation Successful!</h2>
              <p className="reservation-description">
                Your event reservation has been confirmed
              </p>
            </div>

            <div className="reservation-content">
              <p className="share-text">
                Share this unique invitation link with your guests:
              </p>

              <div className="invite-box">
                <input
                  type="text"
                  value={inviteUrl}
                  readOnly
                  className="invite-input"
                />
                <button className="icon-button" onClick={copyToClipboard}>
                  <i className="fa-regular fa-copy"></i>
                </button>
              </div>

              <div className="info-box">
                <h3 className="info-title">Important Information</h3>
                <ul className="info-list">
                  <li>• Share this link with people you want to invite to your event.</li>
                  <li>• Each guest can respond with Confirm, Decline, or Pending.</li>
                  <li>• You can track all responses in your "My Reservations" area.</li>
                  <li>• Keep this link safe - anyone with the link can respond.</li>
                </ul>
              </div>
            </div>

            <div className="reservation-footer">
              <button className="share-button" onClick={shareInvite}>
                <i className="fa-solid fa-share-nodes"></i> Share Invitation
              </button>
              <Link to="/my-reservations" className="outline-button">
                View My Reservations
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReservationSuccess;
