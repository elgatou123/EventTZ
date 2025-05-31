import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Check,
  ShoppingBasket,
  Share2,
  ChevronRight,
  Lock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReservationForm from "../components/ReservationForm";
import { getEventById, mockEvents } from "../data/mockData";
import { formatDate, formatTime } from "../lib/utils";
import { toast } from "../hooks/use-toast";
import "./EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const event = getEventById(id || "");

  if (!event) {
    return (
      <div className="event-detail event-not-found-container">
        <Navbar />
        <main className="event-not-found-main">
          <div className="event-not-found-box">
            <h1 className="event-not-found-title">Événement non trouvé</h1>
            <p className="event-not-found-desc">
              L'événement que vous cherchez n'existe pas ou a été supprimé.
            </p>
            <button
              onClick={() => navigate("/events")}
              className="btn-primary"
            >
              Parcourir les événements
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="event-detail login-required-container">
        <Navbar />
        <main className="login-required-main">
          <div className="login-required-box">
            <div className="login-required-icon-text">
              <Lock className="login-required-icon" />
              <h1 className="login-required-title">Connexion requise</h1>
              <p className="login-required-desc">
                Vous devez vous inscrire ou vous connecter pour voir les détails de l'événement et faire une réservation.
              </p>
            </div>
            <div className="login-required-buttons">
              <button
                onClick={() => navigate("/signup")}
                className="btn-success"
              >
                S'inscrire
              </button>
              <button
                onClick={() => navigate("/login")}
                className="btn-primary"
              >
                Se connecter
              </button>
              <button
                onClick={() => navigate("/events")}
                className="btn-outline"
              >
                Retour aux événements
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: `Découvrez cet événement : ${event.title}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Erreur lors du partage", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien de l'événement a été copié dans le presse-papiers !",
      });
    }
  };

  return (
    <div className="event-detail container">
      <Navbar />
      <main className="main-content">
        <section className="content-left">
          <img
            src={event.image}
            alt={event.title}
            className="event-image"
          />
          <div className="event-type-badge">
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </div>
          <h1 className="event-title">{event.title}</h1>
          <p className="event-description">{event.description}</p>

          <section className="event-details-section">
            <header className="event-details-header">
              <h2 className="event-details-title">Détails de l'événement</h2>
              <p className="event-details-subtitle">Tout ce que vous devez savoir sur cet événement</p>
            </header>

            <div className="event-details-grid">
              <div className="event-detail-item">
                <Calendar className="event-icon" />
                <div>
                  <h3 className="detail-label">Date</h3>
                  <p className="detail-text">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="event-detail-item">
                <Clock className="event-icon" />
                <div>
                  <h3 className="detail-label">Heure</h3>
                  <p className="detail-text">{formatTime(event.time)}</p>
                </div>
              </div>

              <div className="event-detail-item">
                <MapPin className="event-icon" />
                <div>
                  <h3 className="detail-label">Lieu</h3>
                  <p className="detail-text">{event.location}</p>
                </div>
              </div>

              <div className="event-detail-item">
                <User className="event-icon" />
                <div>
                  <h3 className="detail-label">Organisateur</h3>
                  <p className="detail-text">{event.organizerName}</p>
                </div>
              </div>
            </div>

            <section className="event-description-section">
              <h3 className="section-title">Description</h3>
              <p className="event-description">{event.description}</p>
            </section>

            <section className="services-section">
              <h3 className="section-title services-title">
                <ShoppingBasket className="service-icon" />
                Services inclus
              </h3>
              <div className="services-list">
                {event.services.map((service) => (
                  <div key={service.id} className="service-item">
                    <Check className="service-check-icon" />
                    <div>
                      <h4 className="service-name">{service.name}</h4>
                      <p className="service-desc">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <footer className="event-footer">
              <button
                onClick={handleShare}
                className="btn-primary btn-icon"
              >
                <Share2 className="btn-icon-svg" />
                Partager l'événement
              </button>

              <button
                onClick={() => setIsDialogOpen(true)}
                className="btn-success"
              >
                Réserver maintenant
              </button>

              {isDialogOpen && (
                <div
                  onClick={() => setIsDialogOpen(false)}
                  className="dialog-backdrop"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="dialog-content"
                  >
                    <ReservationForm event={event} onClose={() => setIsDialogOpen(false)} />
                  </div>
                </div>
              )}
            </footer>
          </section>
        </section>

        <aside className="sidebar">
          <section className="quick-actions">
            <header className="quick-actions-header">
              <h3>Actions rapides</h3>
            </header>
            <div className="quick-actions-buttons">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="btn-success"
              >
                Réservez votre place
              </button>
              <button
                onClick={handleShare}
                className="btn-primary btn-icon"
              >
                <Share2 className="btn-icon-svg" />
                Partager cet événement
              </button>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                <MapPin className="map-icon" />
                Voir sur la carte
              </a>
            </div>
          </section>

          <section className="similar-events">
            <header className="similar-events-header">
              <h3>Événements similaires</h3>
            </header>
            <div className="similar-events-list">
              {mockEvents
                .filter((e) => e.type === event.type && e.id !== event.id)
                .slice(0, 3)
                .map((similarEvent) => (
                  <Link
                    key={similarEvent.id}
                    to={`/events/${similarEvent.id}`}
                    className="similar-event-item"
                  >
                    <img
                      src={similarEvent.image}
                      alt={similarEvent.title}
                      className="similar-event-image"
                    />
                    <div className="similar-event-info">
                      <h4 className="similar-event-title">{similarEvent.title}</h4>
                      <p className="similar-event-date">{formatDate(similarEvent.date)}</p>
                      <ChevronRight className="similar-event-icon" />
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;
