import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { mockEvents } from "../data/mockData";
import { Search } from "lucide-react";
import "./Events.css";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("all");

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = eventType === "all" || event.type === eventType;

    return matchesSearch && matchesType;
  });

  return (
    
    <div className="page">
      <Navbar />

      <main className="main-content">
        <section className="intro-section">
          <div className="container">
            <h1 className="heading">Browse Events</h1>
            <p className="description">
              Find the perfect event to attend or get inspiration for planning
              your own. Filter by type, date, and location.
            </p>
          </div>
        </section>

        <section className="filter-section">
          <div className="container">
            <div className="filter-box">
              <div className="filter-grid">
                <div className="form-group">
                  <label htmlFor="search" className="form-label">
                    Search
                  </label>
                  <div className="input-wrapper">
                    <Search className="search-icon" />
                    <input
                      id="search"
                      type="text"
                      placeholder="Search by name, description, location..."
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="type" className="form-label">
                    Event Type
                  </label>
                  <select
                    id="type"
                    className="select-input"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option value="all">All event types</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="party">Party</option>
                    <option value="conference">Conference</option>
                    <option value="meeting">Meeting</option>
                    <option value="funeral">Funeral</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group button-wrapper">
                  <button
                    className="reset-button"
                    onClick={() => {
                      setSearchTerm("");
                      setEventType("all");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="events-grid">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No events found</h3>
                <p>
                  Try adjusting your search filters or check back later for new
                  events.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
