import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReservationForm.css";
import { toast } from "../hooks/use-toast";
import { Event } from "../types/index";
import { generateInviteLink } from "../data/mockData";

const ReservationForm = ({ event, onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Generate invite link
    const inviteLink = generateInviteLink(event.id, name);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Reservation Created",
        description: "Your reservation has been created successfully!",
      });

      // Redirect to a success page with the invite link
      navigate(`/reservation-success/${inviteLink}`);
    }, 1000);
  };

  return (
    <div className="reservation-form-card">
      <div className="reservation-card-header">
        <h2 className="reservation-title">Reserve for {event.title}</h2>
        <p className="reservation-description">
          Please fill in your details to reserve your spot.
        </p>
      </div>
      <div className="reservation-card-content">
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <input
              id="guests"
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="How many guests will attend?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Special Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests or dietary requirements?"
              rows={3}
            />
          </div>

          <div className="form-footer">
            <button className="cancel-button" onClick={onClose} type="button">
              Cancel
            </button>
            <button
              className={`reserve-button ${isSubmitting ? 'processing' : ''}`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Reserve Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
