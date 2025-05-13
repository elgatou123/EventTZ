import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { formatDate } from "../lib/utils";
import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`} className="event-card">
      <div className="event-card-image-wrapper">
        <img 
          src={event.image} 
          alt={event.title} 
        />
        <div className="event-type-label">
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </div>
      </div>
      <div className="event-card-content">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div className="event-card-meta">
          <Calendar size={16} />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="event-card-meta">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>
      </div>
      <div className="event-card-footer">
        Organized by {event.organizerName}
      </div>
    </Link>
  );
};

export default EventCard;
