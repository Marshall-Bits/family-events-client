import { useEffect, useState } from "react";
import { eventsService } from "../services/services";
import "./HomePage.css";
import EventCard from "../components/EventCard";
import Spinner from "../components/Spinner";
import logo from "/assets/img/house-bg2.webp";
import sadFork from "/assets/img/sad-fork.webp";


const HomePage = () => {
    const [events, setEvents] = useState(null);

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
            <img src={logo} className="header-logo" />

            <h1 className="event-title">Següents events</h1>
            {
                events ?
                    events.length !== 0 ?
                        <ul className="events-list-container">
                            {events.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </ul>
                        :
                        <div className="no-events-container">
                            <p>No hi ha cap event programat 😓</p>
                            <img className="sad-fork" src={sadFork} alt="A sad fork sitting on a chair in front of a table" />
                            <p>Afegeix un event nou!</p>
                            <p className="finger">👇</p>
                        </div>
                    :
                    <Spinner />
            }
        </section>
    );
};

export default HomePage;