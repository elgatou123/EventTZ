import { useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, User, Check, ShoppingBasket, Share2, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReservationForm from "../components/ReservationForm";
import { getEventById, mockEvents } from "../data/mockData";
import { formatDate, formatTime } from "../lib/utils";
import "./EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const event = getEventById(id || "");

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href,
      }).catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
    }
  };

  if (!event) {
    return (
      <div className="page-container">
        <Navbar />
        <main className="main-content">
          <div className="not-found">
            <h1>Event Not Found</h1>
            <p>The event you're looking for doesn't exist or has been removed.</p>
            <a href="/events" className="btn primary">Browse Events</a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />

      <main className="main-content">
        {/* Banner */}
        <div className="event-banner">
          <img src={event.image} alt={event.title} className="banner-image" />
          <div className="banner-content">
            <span className="badge">{event.type}</span>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
          </div>
        </div>

        <div className="event-container">
          <div className="event-grid">
            {/* Left */}
            <div className="event-details">
              <div className="card">
                <div className="card-header">
                  <h2>Event Details</h2>
                  <p>All you need to know about this event</p>
                </div>
                <div className="card-body">
                  <div className="details-grid">
                    <div className="detail-item">
                      <Calendar className="icon" />
                      <div>
                        <h4>Date</h4>
                        <p>{formatDate(event.date)}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <Clock className="icon" />
                      <div>
                        <h4>Time</h4>
                        <p>{formatTime(event.time)}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <MapPin className="icon" />
                      <div>
                        <h4>Location</h4>
                        <p>{event.location}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <User className="icon" />
                      <div>
                        <h4>Organizer</h4>
                        <p>{event.organizerName}</p>
                      </div>
                    </div>
                  </div>

                  <div className="description-section">
                    <h4>Description</h4>
                    <p>{event.description}</p>
                  </div>

                  <div className="services-section">
                    <h4><ShoppingBasket className="icon" /> Services Included</h4>
                    <div className="services-grid">
                      {event.services.map((service) => (
                        <div key={service.id} className="service-card">
                          <Check className="icon" />
                          <div>
                            <h5>{service.name}</h5>
                            <p>{service.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button className="btn outline" onClick={handleShare}>
                    <Share2 className="icon" /> Share Event
                  </button>
                  <button className="btn primary" onClick={() => setIsDialogOpen(true)}>
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="side-section">
              <div className="card">
                <div className="card-header">
                  <h2>Quick Actions</h2>
                </div>
                <div className="card-body vertical-buttons">
                  <button className="btn primary" onClick={() => setIsDialogOpen(true)}>
                    Reserve Your Spot
                  </button>
                  <button className="btn outline" onClick={handleShare}>
                    <Share2 className="icon" /> Share This Event
                  </button>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn outline"
                  >
                    <MapPin className="icon" /> View on Map
                  </a>
                </div>
              </div>

              <div className="card similar-events">
                <div className="card-header">
                  <h2>Similar Events</h2>
                </div>
                <div className="card-body">
                  {mockEvents
                    .filter((e) => e.type === event.type && e.id !== event.id)
                    .slice(0, 3)
                    .map((similarEvent) => (
                      <a key={similarEvent.id} href={`/events/${similarEvent.id}`} className="similar-event">
                        <img src={similarEvent.image} alt={similarEvent.title} />
                        <div>
                          <h5>{similarEvent.title}</h5>
                          <p>{formatDate(similarEvent.date)}</p>
                        </div>
                        <ChevronRight className="icon" />
                      </a>
                    ))}
                </div>
                <div className="card-footer">
                  <a href="/events" className="btn ghost">
                    View All Events
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isDialogOpen && (
          <div className="dialog-overlay" onClick={() => setIsDialogOpen(false)}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
              <ReservationForm event={event} onClose={() => setIsDialogOpen(false)} />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
