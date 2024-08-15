import { useState } from "react";

const SearchInput = ({ setDisplayedParticipants, availableParticipants }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        const filteredParticipants = availableParticipants.filter(
          (participant) =>
            participant.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
        );
        setDisplayedParticipants(filteredParticipants);
      }}
      placeholder="Busca un nom"
    />
  );
};

export default SearchInput;
