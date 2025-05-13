import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Event-Verse
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/events" className="nav-link">
            Events
          </Link>
          <Link to="/my-reservations" className="nav-link">
            My Reservations
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/events" className="btn-plan">
            Plan Your Event
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn">
          <button onClick={toggleMenu} aria-label="Menu" className="menu-btn">
            {isMenuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-links">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/events" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Events
            </Link>
            <Link to="/my-reservations" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              My Reservations
            </Link>
            <Link to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/events" className="btn-plan-mobile" onClick={() => setIsMenuOpen(false)}>
              Plan Your Event
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
