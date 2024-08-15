import { useEffect, useState, useContext } from "react";
import { eventsService, userService } from "../services/services";
import { useParams } from "react-router-dom";
import "./EventPage.css";
import { addParticipantsContext } from "../context/participant.context";
import imageBG from "/assets/img/house-bg.webp";
import { formatDate } from "../utils/formatDate";
import ParticipantCard from "../components/ParticipantCard";
import Spinner from "../components/Spinner";
import AddParticipantMenu from "../components/AddParticipantMenu";
import EditMenu from "../components/EditMenu";

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [availableParticipants, setAvailableParticipants] = useState([]);
  const [allParticipants, setAllParticipants] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [extraParticipants, setExtraParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showParticipantsMenu } = useContext(addParticipantsContext);
  const [showEditMenu, setShowEditMenu] = useState(false);

  const getEvent = () => {
    setLoading(true);
    eventsService
      .getOne(eventId)
      .then((response) => {
        setEvent(response.data);
        setParticipants(response.data.participants);
        setExtraParticipants(response.data.extraParticipants || []);
      })
      .catch((error) => {
        console.error(error);
      });

    userService
      .getAll()
      .then((response) => {
        setAllParticipants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const generateAvailableParticipants = () => {
    const availableParticipants = allParticipants.filter(
      (participant) => !participants.some((p) => p._id === participant._id)
    );
    setAvailableParticipants(availableParticipants);
  };

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    generateAvailableParticipants();
  }, [event, showParticipantsMenu]);

  const addParticipants = (userIdsArray) => {
    const newParticipants = allParticipants.filter((participant) =>
      userIdsArray.includes(participant._id)
    );
    setParticipants([...participants, ...newParticipants]);
    generateAvailableParticipants([...participants, newParticipants]);
    newParticipants.forEach((participant) => {
      eventsService.addParticipant(eventId, participant._id).catch((error) => {
        console.error(error);
      });
    });
  };

  const deleteParticipant = (userId) => {
    const newParticipants = participants.filter(
      (participant) => participant._id !== userId
    );
    setParticipants(newParticipants);
    generateAvailableParticipants(newParticipants);

    eventsService.deleteParticipant(eventId, userId).catch((error) => {
      console.error(error);
    });
  };

  const deleteExtraParticipant = (participant) => {
    const newExtraParticipants = extraParticipants.filter(
      (p) => p !== participant
    );
    setExtraParticipants(newExtraParticipants);

    eventsService
      .deleteExtraParticipant(eventId, participant)
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="general-page-container">
      {showEditMenu && (
        <EditMenu
          setShowEditMenu={setShowEditMenu}
          event={event}
          participants={[
            ...participants,
            ...extraParticipants.map((p) => ({ name: p })),
          ]}
        />
      )}
      <img
        loading="lazy"
        className="header-img"
        src={imageBG}
        alt="background image of a house in the mountain"
      />
      <h1 className="event-title">{event.name}</h1>
      {!loading ? (
        <article className="event-container">
          <div className="event-details">
            <div onClick={() => setShowEditMenu(true)} id="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>📆{formatDate(event.date)}</p>
            <p>🚩{event.location}</p>
            <p>✏️{event.description}</p>
            <p>
              👨‍👩‍👧‍👦 {participants.length + extraParticipants?.length} assistents
            </p>
          </div>

          <h2>Participants:</h2>
          {participants?.length === 0 && extraParticipants.length === 0 ? (
            <>
              <p className="icon-no-idea">🤷🏻‍♀️</p>
              <p>Afegeix participants</p>
              <p className="finger">👇</p>
            </>
          ) : (
            <>
              <ol className="participants-list">
                {participants &&
                  participants.map((participant) => (
                    <ParticipantCard
                      participant={participant}
                      deleteParticipant={deleteParticipant}
                      key={participant._id}
                    />
                  ))}
                {extraParticipants &&
                  extraParticipants.map((participant, index) => (
                    <ParticipantCard
                      participant={{ name: participant }}
                      deleteParticipant={deleteExtraParticipant}
                      key={index}
                      isExtra={true}
                    />
                  ))}
              </ol>
            </>
          )}
          {showParticipantsMenu && (
            <AddParticipantMenu
              getEvent={getEvent}
              availableParticipants={availableParticipants}
              addParticipants={addParticipants}
            />
          )}
        </article>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default EventPage;
