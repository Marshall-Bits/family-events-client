import { useEffect, useState } from "react";
import { eventsService } from "../services/services";
import "./HomePage.css";
import EventCard from "../components/EventCard";
import Spinner from "../components/Spinner";
import logo from "/assets/img/house-bg2.webp";
import sadFork from "/assets/img/sad-fork.webp";

const HomePage = () => {
    const [events, setEvents] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(src);
                image.onerror = (error) => reject(error);
                image.src = src;
            });
        };

        const loadImages = async () => {
            try {
                await Promise.all([loadImage(logo), loadImage(sadFork)]);
                setImagesLoaded(true);
            } catch (error) {
                console.error("Error loading images:", error);
            }
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (events && imagesLoaded) {
            setPageLoaded(true);
        }
    }, [events, imagesLoaded]);

    
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
            {!pageLoaded && <Spinner />} 

            {pageLoaded && (
                <>
                    <img loading="lazy" src={logo} className="header-logo" />

                    <h1 className="event-title">Següents quedades</h1>
                    {events && events.length !== 0 ? (
                        <ul className="events-list-container">
                            {events.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </ul>
                    ) : (
                        <div className="no-events-container">
                            <p>No hi ha cap quedada programada 😓</p>
                            <img loading="lazy" className="sad-fork" src={sadFork} alt="A sad fork sitting on a chair in front of a table" />
                            <p>Afegeix una nova quedada!</p>
                            <p className="finger">👇</p>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default HomePage;
