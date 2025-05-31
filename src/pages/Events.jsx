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
const userInfo = useSelector((state) => state.user?.userInfo);
  console.log("Événements depuis Redux:", events);


  let parsedUser = null;
  try {
    const rawUser = localStorage.getItem("user");
    parsedUser = rawUser ? JSON.parse(rawUser) : null;
  } catch {
    parsedUser = null;
  }

  useEffect(() => {
    dispatch(Actions.getEvents());
  }, [dispatch]);

  const getFilteredEvents = () => {
    let eventsToShow = events;

    if (parsedUser?.role === "organizer") {
      eventsToShow = eventsToShow.filter(
        (event) => event.organizer_id === parsedUser.id
      );
    }

    return eventsToShow.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = eventType === "all" || event.type === eventType;

      return matchesSearch && matchesType;
    });
  };

  const filteredEvents = getFilteredEvents();

  const getPageTitle = () =>
    parsedUser?.role === "organizer"
      ? "Mes Événements"
      : "Parcourir les Événements";

  const getPageDescription = () =>
    parsedUser?.role === "organizer"
      ? "Gérez vos événements et suivez les réservations."
      : "Trouvez l'événement parfait auquel assister ou inspirez-vous pour planifier le vôtre.";

  const getEmptyStateMessage = () => {
    if (parsedUser?.role === "organizer") {
      return {
        title: "Vous n'avez aucun événement",
        description:
          "Cliquez ci-dessous pour créer votre premier événement et commencer à gérer les réservations.",
        action: "Créer Votre Premier Événement",
      };
    }
    return {
      title: "Aucun événement trouvé",
      description:
        "Essayez d'ajuster vos filtres de recherche ou revenez plus tard pour de nouveaux événements.",
      action: null,
    };
  };

  const handleCreateEvent = async (eventData) => {
    try {
      await dispatch(Actions.createEvent(eventData));
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const emptyState = getEmptyStateMessage();

  return (
    <div className="page">
      <Navbar />

      <main className="main-content">
        <section className="intro-section">
          <div className="container">
            <h1 className="heading">{getPageTitle()}</h1>
            <p className="description">{getPageDescription()}</p>
            {parsedUser?.role === "organizer" && (
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
                      placeholder="Rechercher par nom, description, lieu..."
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
                    <option value="all">Tous les types d'événements</option>
                    <option value="wedding">Mariage</option>
                    <option value="party">Fête</option>
                    <option value="funeral">Funérailles</option>
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
                    Réinitialiser les Filtres
                  </button>
                </div>
              </div>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="events-grid">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isOwner={
                      parsedUser?.role === "organizer" &&
                      parsedUser.id === event.organizer_id
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>{emptyState.title}</h3>
                <p>{emptyState.description}</p>
                {emptyState.action && parsedUser?.role === "organizer" && (
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

      {parsedUser?.role === "organizer" && (
        <CreateEventDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleCreateEvent}
        />
      )}

      <Footer />
    </div>
  );
};

export default Events;
