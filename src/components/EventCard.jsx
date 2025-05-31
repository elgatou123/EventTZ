import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Edit, Trash2, MoreVertical } from "lucide-react";
import PropTypes from "prop-types";
import EditEventDialog from "./EditEventDialog";
import { useToast } from "../hooks/use-toast";
import "./EventCard.css";

const EventCard = ({ event, isOwner }) => {
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Safe destructuring with defaults
  const {
    id = '',
    title = 'Titre non disponible',
    description = 'Description non disponible',
    location = 'Lieu non spécifié',
    type = 'other',
    image = '/default-event-image.jpg',
    available_spots = 0,
    organizer_id = null
  } = event || {};

  if (!event) {
    return <div className="event-card error">Chargement de l'événement...</div>;
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setShowEditDialog(true);
    setShowDropdown(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Deleting event:", id);
    toast({
      title: "Événement Supprimé",
      description: "Votre événement a été supprimé avec succès.",
    });
    setShowDeleteDialog(false);
  };

  const handleImageError = (e) => {
    e.target.src = '/default-event-image.jpg';
  };

  // Safe type display
  const displayType = type 
    ? type.charAt(0).toUpperCase() + type.slice(1)
    : 'Événement';

  return (
    <div className="event-card" data-testid="event-card">
      <Link to={`/events/${id}`} className="event-link">
        <div className="event-image-wrapper">
          <img
            src={image}
            alt={title}
            className="event-image"
            onError={handleImageError}
          />
          <div className="event-type-badge">
            {displayType}
          </div>

          {isOwner && (
            <div className="event-dropdown">
              <button
                className="dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
                aria-haspopup="true"
                aria-expanded={showDropdown}
                aria-label="Menu options"
              >
                <MoreVertical className="icon-small" />
              </button>

              {showDropdown && (
                <ul 
                  className="dropdown-menu" 
                  role="menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <li
                    className="dropdown-item"
                    onClick={handleEdit}
                    role="menuitem"
                  >
                    <Edit className="icon-small dropdown-icon" />
                    Modifier
                  </li>
                  <li
                    className="dropdown-item dropdown-delete"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDeleteDialog(true);
                      setShowDropdown(false);
                    }}
                    role="menuitem"
                  >
                    <Trash2 className="icon-small dropdown-icon" />
                    Supprimer
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="event-content">
          <h3 className="event-title">{title}</h3>
          <p className="event-description">
            {description.length > 100 
              ? `${description.substring(0, 100)}...` 
              : description}
          </p>
          <div className="event-meta">
            <span>Places disponibles: {available_spots}</span>
          </div>
          <div className="event-meta">
            <MapPin size={16} />
            <span className="location">{location}</span>
          </div>
        </div>
      </Link>

      <div className="event-footer">
        Organisé par {organizer_id || 'Anonyme'}
      </div>

      {showDeleteDialog && (
        <div
          className="alert-dialog-backdrop"
          onClick={() => setShowDeleteDialog(false)}
        >
          <div className="alert-dialog-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="alert-dialog-title">
              Êtes-vous sûr ?
            </h2>
            <p className="alert-dialog-description">
              Cette action supprimera définitivement votre événement.
            </p>
            <div className="alert-dialog-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowDeleteDialog(false)}
              >
                Annuler
              </button>
              <button
                className="btn-delete"
                onClick={handleDelete}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <EditEventDialog 
        open={showEditDialog} 
        onOpenChange={setShowEditDialog} 
        event={event} 
      />
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    available_spots: PropTypes.number,
    organizer_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }).isRequired,
  isOwner: PropTypes.bool
};

EventCard.defaultProps = {
  isOwner: false
};

export default EventCard;