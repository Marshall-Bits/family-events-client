import { useEffect, useState } from "react";
import { eventsService } from "../services/services";
import EventCard from "../components/EventCard";


const HomePage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        eventsService.getAll()
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <section className="page-container">
            <h1>Events</h1>
            <ul>
                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </ul>
        </section>
    );
};

export default HomePage;