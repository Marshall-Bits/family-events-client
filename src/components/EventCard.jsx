import './EventCard.css';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {

    const formatDate = (date) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <li className="event-card-container">
            <Link to={`/events/${event._id}`}>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p>{formatDate(event.date)}</p>
                <p>Participants: {event.participants.length}</p>
            </Link>

        </li>
    );
};

export default EventCard;
