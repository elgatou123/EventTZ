import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import ReservationSuccess from "./pages/ReservationSuccess";
import InvitePage from "./pages/InvitePage";
import MyReservations from "./pages/MyReservations";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./style.css"; 
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/reservation-success/:inviteLink" element={<ReservationSuccess />} />
      <Route path="/invite/:inviteLink" element={<InvitePage />} />
      <Route path="/my-reservations" element={<MyReservations />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
