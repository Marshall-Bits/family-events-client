import { useState, useContext } from "react";
import './NewEventPage.css';
import { eventsService } from "../services/services";
import { popupContext } from "../context/popup.context";

const NewEventPage = () => {
    const { setPopupMessage, setShowPopup } = useContext(popupContext);


    const [formData, setFormData] = useState({
        name: "",
        date: "",
        description: "",
        location: ""
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        eventsService.create(formData)
            .then((response) => {
                setPopupMessage(`El teu event: ${response.data.name} ha estat creat!`);
                setShowPopup(true);
            })
            .catch((error) => {
                setPopupMessage(`Hi ha hagut un error 😓, intenta-ho més tard.`);
                setShowPopup(true);
            });
    };


    return (
        <div>
            <h1>New Event</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" >Name</label>
                <input
                    required
                    maxLength={15}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="date" >Date</label>
                <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
                <label htmlFor="description" >Description</label>
                <textarea
                    required
                    maxLength={30}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <label htmlFor="location" >Location</label>
                <input
                    required
                    maxLength={15}
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default NewEventPage;