import { Link } from "react-router-dom";
import { Calendar, Users, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './indexH.css'; 

const Index = () => {
  return (
    <div className="page">
      <Navbar />
      
      <main className="main">
        {/* Hero Section */}
        <section className="hero-gradient">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Create Memorable Events with Easy Invitations
              </h1>
              <p className="hero-description">
                Simplify your event planning process. Create events, manage invitations, and track responses - all in one place.
              </p>
              <div className="hero-buttons">
                <Link to="/events" className="button-primary">Browse Events</Link>
                <Link to="/about" className="button-outline">Learn More</Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2 className="features-title">How It Works</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Calendar className="icon" />
                </div>
                <h3 className="feature-title">Create Your Event</h3>
                <p className="feature-description">
                  Set up your event with all the details: date, location, and services needed.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Users className="icon" />
                </div>
                <h3 className="feature-title">Invite Guests</h3>
                <p className="feature-description">
                  Generate unique invite links and share them with your guests effortlessly.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <Clock className="icon" />
                </div>
                <h3 className="feature-title">Track Responses</h3>
                <p className="feature-description">
                  Easily monitor who has confirmed, declined, or is still pending.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Event Types Section */}
        <section className="event-types-section">
          <div className="container">
            <h2 className="event-types-title">Perfect for Any Occasion</h2>
            <p className="event-types-description">
              From intimate gatherings to large corporate events, our platform handles it all.
            </p>
            <div className="event-types-grid">
              {['Wedding', 'Birthday', 'Conference', 'Party'].map((type) => (
                <div key={type} className="event-type-card">
                  <h3 className="event-type-title">{type}</h3>
                  <p className="event-type-description">{getEventTypeDescription(type)}</p>
                  <Link to="/events" className="view-events-button">View {type} Events</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <h2 className="cta-title">Ready to Plan Your Next Event?</h2>
            <p className="cta-description">
              Join thousands of event planners who make their events successful with Event-Verse.
            </p>
            <Link to="/events" className="cta-button">Get Started Today</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

function getEventTypeDescription(type) {
  switch (type) {
    case 'Wedding':
      return 'Create beautiful wedding invitations and manage your special day.';
    case 'Birthday':
      return 'Plan the perfect birthday celebration and keep track of all your guests.';
    case 'Conference':
      return 'Organize professional conferences with detailed scheduling and RSVPs.';
    case 'Party':
      return 'Host amazing parties and ensure everyone has the details they need.';
    default:
      return 'Plan and organize your event with ease.';
  }
}

export default Index;
