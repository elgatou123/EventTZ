import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import CreateEventDialog from "../components/CreateEventDialog";
import { Search, Plus } from "lucide-react";
import { Actions } from "../store";
import "./Events.css";

const Events = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const events = useSelector((state) => state.events?.data || []);
  const { user: reduxUser } = useSelector((state) => state.auth);
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        setLocalUser(JSON.parse(userData).user);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const user = reduxUser || localUser;

  useEffect(() => {
    dispatch(Actions.getEvents());
  }, [dispatch]);

  const getFilteredEvents = () => {
    let filtered = [...events];

    // Filter by user role
    if (user?.role === "organizer") {
      filtered = filtered.filter(event => 
        event?.organizer_id === user?.id
      );
    }

    // Apply search and type filters
    return filtered.filter(event => {
      if (!event) return false;

      const matchesSearch = 
        (event.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         event.location?.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = 
        eventType === "all" || 
        event.type?.toLowerCase() === eventType.toLowerCase();

      return matchesSearch && matchesType;
    });
  };

  const filteredEvents = getFilteredEvents().map(event => ({
    id: event.id || '',
    title: event.title || 'Titre non disponible',
    description: event.description || '',
    location: event.location || '',
    type: event.type || 'other',
    image: event.image || '/default-event-image.jpg',
    available_spots: event.available_spots || 0,
    organizer_id: event.organizer_id || null,
    services: event.services || []
  }));

  const getPageTitle = () => 
    user?.role === "organizer" ? "Mes Événements" : "Parcourir les Événements";

  const getPageDescription = () =>
    user?.role === "organizer"
      ? "Gérez vos événements et suivez les réservations."
      : "Trouvez l'événement parfait auquel assister ou inspirez-vous pour planifier le vôtre.";

  const emptyState = {
    title: user?.role === "organizer" 
      ? "Vous n'avez aucun événement" 
      : "Aucun événement trouvé",
    description: user?.role === "organizer"
      ? "Créez votre premier événement pour commencer."
      : "Essayez de modifier vos critères de recherche.",
    action: user?.role === "organizer" ? "Créer un Événement" : null
  };

  return (
    <div className="page">
      <Navbar />

      <main className="main-content">
        <section className="intro-section">
          <div className="container">
            <h1 className="heading">{getPageTitle()}</h1>
            <p className="description">{getPageDescription()}</p>
            
            {user?.role === "organizer" && (
              <button
                className="create-button"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="icon" />
                Créer un Événement
              </button>
            )}
          </div>
        </section>

        <section className="filter-section">
          <div className="container">
            <div className="filter-box">
              <div className="filter-grid">
                <div className="form-group">
                  <label htmlFor="search" className="form-label">
                    Rechercher
                  </label>
                  <div className="input-wrapper">
                    <Search className="search-icon" />
                    <input
                      id="search"
                      type="text"
                      placeholder="Rechercher..."
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="type" className="form-label">
                    Type d'Événement
                  </label>
                  <select
                    id="type"
                    className="select-input"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option value="all">Tous les types</option>
                    <option value="wedding">Mariage</option>
                    <option value="party">Fête</option>
                    <option value="conference">Conférence</option>
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
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="events-grid">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id || `event-${Math.random().toString(36).substr(2, 9)}`}
                    event={event}
                    isOwner={user?.role === "organizer" && user.id === event.organizer_id}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>{emptyState.title}</h3>
                <p>{emptyState.description}</p>
                {emptyState.action && (
                  <button
                    className="create-button"
                    onClick={() => setIsCreateDialogOpen(true)}
                  >
                    <Plus className="icon" />
                    {emptyState.action}
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {user?.role === "organizer" && (
        <CreateEventDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      )}

      <Footer />
    </div>
  );
};

export default Events;

