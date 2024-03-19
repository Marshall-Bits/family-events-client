import { useEffect, useState, useContext } from "react";
import { eventsService, userService } from "../services/services";
import { useParams } from "react-router-dom";
import './EventPage.css';
import { addParticipantsContext } from "../context/participant.context";
import imageBG from '/assets/img/house-bg.webp';
import { formatDate } from '../utils/formatDate';
import ParticipantCard from "../components/ParticipantCard";
import Spinner from "../components/Spinner";
import AddParticipantMenu from "../components/AddParticipantMenu";
import getListToPaste from "../utils/getListToPaste";

const EventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [availableParticipants, setAvailableParticipants] = useState([]);
    const [allParticipants, setAllParticipants] = useState([]); // [1,2,3,4,5,6,7,8,9,10
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showParticipantsMenu } = useContext(addParticipantsContext);


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
                setAllParticipants(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const generateAvailableParticipants = () => {
        const availableParticipants = allParticipants.filter((participant) => !participants.some((p) => p._id === participant._id));
        setAvailableParticipants(availableParticipants);
    };

    useEffect(() => {
        getEvent();
    }, []);

    useEffect(() => {
        generateAvailableParticipants();
    }, [event, showParticipantsMenu]);

    const addParticipants = (userIdsArray) => {
        const newParticipants = allParticipants.filter((participant) => userIdsArray.includes(participant._id));
        setParticipants([...participants, ...newParticipants]);
        generateAvailableParticipants([...participants, newParticipants]);
        newParticipants.forEach((participant) => {
            eventsService.addParticipant(eventId, participant._id)
                .then((response) => {
                    // getEvent();
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    };

    const deleteParticipant = (userId) => {

        const newParticipants = participants.filter((participant) => participant._id !== userId);
        setParticipants(newParticipants);
        generateAvailableParticipants(newParticipants);

        eventsService.deleteParticipant(eventId, userId)
            .then((response) => {
                // getEvent();
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
                            <p>📆{formatDate(event.date)}</p>
                            <p>🚩{event.location}</p>
                            <p>✏️{event.description}</p>
                            <button onClick={() => { getListToPaste(event.name, formatDate(event.date), participants) }}>Enviar per Whatsapp</button>
                        </div>

                        <h2>Participants:</h2>
                        {
                            participants?.length === 0 ?
                                <>
                                    <p className="icon-no-idea">🤷🏻‍♀️</p>
                                    <p>Afegeix participants</p>
                                    <p className="finger">👇</p>
                                </>
                                :
                                <>
                                    <ol className="participants-list">
                                        {participants && participants.map((participant) => (
                                            <ParticipantCard participant={participant} deleteParticipant={deleteParticipant} key={participant._id} />
                                        ))}
                                    </ol>

                                </>
                        }
                        {
                            showParticipantsMenu &&
                            <AddParticipantMenu availableParticipants={availableParticipants} addParticipants={addParticipants} />
                        }

                    </article>
                    :
                    <Spinner />

            }
        </section >
    );
};

export default EventPage;