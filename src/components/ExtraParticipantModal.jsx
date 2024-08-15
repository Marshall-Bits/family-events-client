import { useState } from "react";
import { eventsService } from "../services/services";
import { useParams } from "react-router-dom";
import "./ExtraParticipantModal.css";

const ExtraParticipantModal = ({ setShowModal, getEvent, handleFadeOut }) => {
  const [participant, setParticipant] = useState("");
  const { eventId } = useParams();

  const handleAddParticipant = (participant) => {
    eventsService
      .addExtraParticipant(eventId, {
        name: participant,
      })
      .then(() => {
        getEvent();
        handleFadeOut();
        setShowModal(false);
      });
  };

  return (
    <div className="layout">
      <div className="modal">
        <input type="text" onChange={(e) => setParticipant(e.target.value)} />
        <button onClick={() => handleAddParticipant(participant)}>Afegir</button>
      </div>
    </div>
  );
};

export default ExtraParticipantModal;
