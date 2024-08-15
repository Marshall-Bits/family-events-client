import "./EventCard.css";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const EventCard = ({ event }) => {
  return (
    <li className="event-card-container">
      <Link to={`/events/${event._id}`}>
        <h3>{event.name}</h3>
        <p>📆{formatDate(event.date)}</p>
        <p>{event.description}</p>
        <p>👨‍👩‍👧‍👦 {event.participants.length + event.extraParticipants.length}</p>
      </Link>
    </li>
  );
};

export default EventCard;
