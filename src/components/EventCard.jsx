import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Edit, Trash2, MoreVertical } from "lucide-react";
import EditEventDialog from "./EditEventDialog";
import { useToast } from "../hooks/use-toast";
import "./EventCard.css"; // Assuming you have a CSS file for styling

const EventCard = ({ event, isOwner = false }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { toast } = useToast();

  const handleEdit = (e) => {
    e.preventDefault();
    setShowEditDialog(true);
    setShowDropdown(false);
  };

  const handleDelete = () => {
    console.log("Suppression de l'événement:", event.id);
    toast({
      title: "Événement Supprimé",
      description: "Votre événement a été supprimé avec succès.",
    });
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="event-card">
        <Link to={`/events/${event.id}`} className="event-link">
          <div className="event-image-wrapper">
            <img
              src={event.image}
              alt={event.title}
              className="event-image"
            />
            <div className="event-type-badge">
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </div>

            {isOwner && (
              <div className="event-dropdown">
                <button
                  className="dropdown-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDropdown(!showDropdown);
                  }}
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                  aria-label="Open menu"
                >
                  <MoreVertical className="icon-small" />
                </button>

                {showDropdown && (
                  <ul className="dropdown-menu" role="menu">
                    <li
                      className="dropdown-item"
                      onClick={handleEdit}
                      role="menuitem"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleEdit(e)}
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
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setShowDeleteDialog(true);
                          setShowDropdown(false);
                        }
                      }}
                    >
                      <Trash2 className="icon-small dropdown-icon" />
                      Supprimer
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </Link>

        <Link to={`/events/${event.id}`} className="event-link">
          <div className="event-content">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <div className="event-meta">
              <span>place disponibles :{event.available_spots}</span>
            </div>
            <div className="event-meta">
              <MapPin size={16} />
              <span className="location">{event.location}</span>
            </div>
          </div>
          <div className="event-footer">
            Organisé par {event.organizerName}
          </div>
        </Link>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div
          className="alert-dialog-backdrop"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="alert-dialog-content">
            <h2 className="alert-dialog-title" id="alert-dialog-title">
              Êtes-vous sûr ?
            </h2>
            <p className="alert-dialog-description" id="alert-dialog-description">
              Cette action ne peut pas être annulée. Cela supprimera définitivement votre événement
              et supprimera toutes les données associées.
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

      <EditEventDialog open={showEditDialog} onOpenChange={setShowEditDialog} event={event} />
    </>
  );
};

export default EventCard;
