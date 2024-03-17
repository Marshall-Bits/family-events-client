import { useEffect, useState } from "react";
import { eventsService } from "../services/services";
import "./HomePage.css";
import EventCard from "../components/EventCard";
import Spinner from "../components/Spinner";


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
        <section className="general-page-container">
            {
                events.length !== 0 ?
                    <ul className="events-list-container">
                        {events.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </ul>
                    :
                    <Spinner />
            }
        </section>
    );
};

export default HomePage;