import { useEffect, useState } from "react";
import { eventsService, userService } from "../services/services";
import { useParams } from "react-router-dom";

const EventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [availableParticipants, setAvailableParticipants] = useState([]);
    const [participants, setParticipants] = useState([]);

    const getEvent = () => {
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
        <div>
            <h1>{event.name}</h1>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <h2>Participants</h2>
            <ol>
                {event.participants && event.participants.map((participant) => (
                    <li key={participant._id}>{participant.name}<span onClick={() => { deleteParticipant(participant._id) }}>❌</span> </li>
                ))}
            </ol>

            <h2>Add</h2>
            <ul>
                {availableParticipants.map((participant) => (
                    <li onClick={() => addParticipant(participant._id)} key={participant._id}>{participant.name}</li>
                ))}
            </ul>

        </div>
    );
};

export default EventPage;