import { useContext, useState, useEffect } from "react";
import "./AddParticipantMenu.css";
import { addParticipantsContext } from "../context/participant.context";
import Spinner from "./Spinner";
import SearchInput from "./SearchInput";
import ExtraParticipantModal from "./ExtraParticipantModal";

const AddParticipantMenu = ({
  availableParticipants,
  addParticipants,
  getEvent,
}) => {
  const { setShowParticipantsMenu } = useContext(addParticipantsContext);
  const [participantsToAdd, setParticipantsToAdd] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(true);
  const [displayedParticipants, setDisplayedParticipants] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const defaultImage =
    "https://res.cloudinary.com/marcelusironhack/image/upload/v1710765987/neutralPNG_p60p83.png";

  /*   useEffect(() => {
    const loadImagePromises = availableParticipants.map(
      (participant) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = reject;
          image.src = participant.imageUrl;
        })
    );

    Promise.all(loadImagePromises)
      .then(() => setImagesLoaded(true))
      .catch((error) => console.error("Error loading images:", error));
  }, [availableParticipants]);
 */
  useEffect(() => {
    setDisplayedParticipants(availableParticipants);
  }, []);

  const handleFadeOut = () => {
    setIsFadingOut(true);
    participantsToAdd.length > 0 && addParticipants(participantsToAdd);
    setTimeout(() => {
      setShowParticipantsMenu(false);
    }, 300);
  };

  const handleCheckBox = (e, id) => {
    if (e.target.checked) {
      setParticipantsToAdd([...participantsToAdd, id]);
    } else {
      setParticipantsToAdd(
        participantsToAdd.filter((participantId) => participantId !== id)
      );
    }
  };

  return (
    <div
      className={`add-participant-container ${
        isFadingOut ? "fade-out-menu" : "fade-in-menu"
      }`}
    >
      {!imagesLoaded && <Spinner />}{" "}
      {/* Display the spinner until all images are loaded */}
      {imagesLoaded && (
        <>
          <ul>
            <SearchInput
              availableParticipants={availableParticipants}
              setDisplayedParticipants={setDisplayedParticipants}
            />
            {displayedParticipants.map((participant) => (
              <li className="li-participant" key={participant._id}>
                <input
                  onChange={(e) => handleCheckBox(e, participant._id)}
                  checked={participantsToAdd.includes(participant._id)}
                  type="checkbox"
                />
                <img
                  className="avatar"
                  src={participant.imageUrl}
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                  alt={`avatar of ${participant.name}`}
                  loading="lazy"
                />
                <p>{participant.name}</p>
              </li>
            ))}
            <button className="extra" onClick={() => setShowModal(true)}>
              Afegeix algú extra
            </button>
            {showModal && (
              <ExtraParticipantModal
                getEvent={getEvent}
                handleFadeOut={handleFadeOut}
                setShowModal={setShowModal}
                handleClose={handleFadeOut}
              />
            )}
          </ul>
          {participantsToAdd.length === 0 ? (
            <button
              className="close-btn cancel"
              onClick={() => handleFadeOut()}
            >
              ➕
            </button>
          ) : (
            <button className="close-btn" onClick={() => handleFadeOut()}>
              ➕
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AddParticipantMenu;
