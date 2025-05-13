import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Calendar,
  Users,
  Bell,
  CheckCircle,
  Shield,
  MessageSquare,
  HelpCircle,
  ChevronRight
} from "lucide-react";
import "./About.css";

const features = [
  {
    icon: <Calendar className="icon" />,
    title: "Easy Event Creation",
    description: "Create beautiful event pages with all the details your guests need."
  },
  {
    icon: <Users className="icon" />,
    title: "Guest Management",
    description: "Invite guests with unique links and track their responses."
  },
  {
    icon: <CheckCircle className="icon" />,
    title: "Response Tracking",
    description: "See who's confirmed, declined, or still pending with real-time updates."
  },
  {
    icon: <Bell className="icon" />,
    title: "Reminders",
    description: "Automatic reminders for upcoming events and pending responses."
  },
  {
    icon: <Shield className="icon" />,
    title: "Privacy & Security",
    description: "Your event data and guest information are always secure with us."
  },
  {
    icon: <MessageSquare className="icon" />,
    title: "Guest Communication",
    description: "Easy communication with all your guests through the platform."
  }
];

const faqs = [
  {
    question: "Is Event-Verse free to use?",
    answer: "Yes, Event-Verse is currently free for basic usage. We may introduce premium features in the future."
  },
  {
    question: "How many guests can I invite?",
    answer: "There is no limit to the number of guests you can invite to your events."
  },
  {
    question: "Can guests see who else is invited?",
    answer: "No, guests can only see their own invitation and response status, not the full guest list."
  },
  {
    question: "Can I edit an event after creating it?",
    answer: "Yes, you can edit your event details at any time, and all guests will see the updated information."
  },
  {
    question: "How do I contact support?",
    answer: "For any questions or assistance, please email us at support@event-verse.com."
  }
];

const steps = [
  {
    step: "1",
    title: "Create an Event",
    description: "Set up your event with all the details: date, time, location, and services."
  },
  {
    step: "2",
    title: "Generate Invitations",
    description: "Create a reservation and get a unique invite link to share with your guests."
  },
  {
    step: "3",
    title: "Share with Guests",
    description: "Send the invite link via email, messaging apps, or social media."
  },
  {
    step: "4",
    title: "Track Responses",
    description: "Monitor who's coming, who's not, and who hasn't responded yet."
  }
];

const About = () => {
  return (
    <div className="about-page">
      <Navbar />

      <main className="about-main">
        <section className="hero-section">
          <div className="container">
            <div className="hero-text">
              <h1>About Event-Verse Invites</h1>
              <p>Making event planning and invitations simple, elegant, and stress-free.</p>
              <Link to="/events" className="btn primary-btn">Explore Events</Link>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="section">
          <div className="container center-text">
            <h2>Our Mission</h2>
            <p>
              At Event-Verse, we believe that planning events should be as enjoyable as attending them. 
              Our mission is to simplify the event planning process by providing a seamless platform for 
              creating events, sending invitations, and tracking responses.
            </p>
            <p>
              Whether it's a wedding, birthday party, conference, or any special occasion, 
              we're here to make your event planning experience stress-free and delightful.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="section gray-bg">
          <div className="container">
            <h2 className="text-center">Key Features</h2>
            <div className="features-grid">
              {features.map((f, i) => (
                <div key={i} className="feature-card">
                  <div className="icon-wrapper">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section">
          <div className="container">
            <h2 className="text-center">How It Works</h2>
            <div className="steps">
              {steps.map((s, i) => (
                <div key={i} className={`step ${i % 2 === 1 ? 'reverse' : ''}`}>
                  <div className="step-number">{s.step}</div>
                  <div className="step-text">
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    {i === 0 && (
                      <Link to="/events" className="btn primary-btn">Browse Events</Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section gray-bg">
          <div className="container">
            <h2 className="text-center">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <div key={i} className="faq-card">
                  <div className="faq-icon"><HelpCircle className="icon" /></div>
                  <div>
                    <h3>{f.question}</h3>
                    <p>{f.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container text-center white-text">
            <h2>Ready to Plan Your Event?</h2>
            <p>Get started today and make your next event a memorable success.</p>
            <Link to="/events" className="btn white-btn">
              Get Started
              <ChevronRight className="icon-right" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
