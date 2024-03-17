import { useEffect, useState } from "react";
import { eventsService, userService } from "../services/services";
import { useParams } from "react-router-dom";
import './EventPage.css';
import imageBG from '/assets/img/house-bg.webp';
import { formatDate } from '../utils/formatDate';
import ParticipantCard from "../components/ParticipantCard";
import Spinner from "../components/Spinner";

const EventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [availableParticipants, setAvailableParticipants] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);

    const getEvent = () => {
        setLoading(true);
        eventsService.getOne(eventId)
            .then((response) => {
                setEvent(response.data);
                setParticipants(response.data.participants);
            })
            .catch((error) => {
                console.error(error);
            });

        userService.getAll()
            .then((response) => {
                setAvailableParticipants(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getEvent();
    }, []);

    useEffect(() => {
        const participantsIds = event.participants ? event.participants.map((participant) => participant._id) : [];
        console.log(participantsIds, availableParticipants);
        const filteredParticipants = availableParticipants.filter((participant) => !participantsIds.includes(participant._id));

        setAvailableParticipants(filteredParticipants);
    }, [participants, event]);

    const addParticipant = (userId) => {
        eventsService.addParticipant(eventId, userId)
            .then((response) => {
                getEvent();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteParticipant = (userId) => {
        eventsService.deleteParticipant(eventId, userId)
            .then((response) => {
                getEvent();
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <section className="general-page-container">
            <img className="header-img" src={imageBG} alt="background image of a house in the mountain" />
            <h1 className="event-title">{event.name}</h1>
            {
                !loading ?
                    <article className="event-container">
                        <div className="event-details">
                            <p>📆 {formatDate(event.date)}</p>
                            <p>🚩{event.location}</p>
                            <p>✏️ {event.description}</p>
                        </div>

                        <h2>Participants:</h2>
                        {
                            event.participants?.length === 0 ?
                                <p>🤷🏻‍♀️</p>
                                :
                                <>
                                    <ol className="participants-list">
                                        {event.participants && event.participants.map((participant) => (
                                            <ParticipantCard participant={participant} deleteParticipant={deleteParticipant} key={participant._id} />
                                        ))}
                                    </ol>

                                </>
                        }
                        <h2>Add</h2>
                        <ul>
                            {availableParticipants.map((participant) => (
                                <li className="li-participant" onClick={() => addParticipant(participant._id)} key={participant._id}>
                                    <img className="avatar" src={participant.imageUrl} alt="" />
                                    <p>
                                        {participant.name}
                                    </p>

                                </li>
                            ))}
                        </ul>
                    </article>
                    :
                    <Spinner />

            }

        </section >
    );
};

export default EventPage;