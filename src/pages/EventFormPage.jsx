import { useState, useContext, useEffect } from "react";
import './EventFormPage.css';
import { eventsService } from "../services/services";
import { popupContext } from "../context/popup.context";
import { useParams } from "react-router-dom";
import { formatYYYMMDD } from "../utils/formatDate";

const EventFormPage = () => {
    const { setPopupMessage, setShowPopup } = useContext(popupContext);
    const { eventId } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        description: "",
        location: ""
    });

    const [isUpdateForm, setIsUpdateForm] = useState(false);

    useEffect(() => {
        if (eventId) {
            setIsUpdateForm(true);
            eventsService.getOne(eventId)
                .then((response) => {
                    setFormData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [eventId]);



    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isUpdateForm) {
            eventsService.create(formData)
                .then((response) => {
                    setPopupMessage(`El teu event: ${response.data.name} ha estat creat!`);
                    setShowPopup(true);
                })
                .catch((error) => {
                    setPopupMessage(`Hi ha hagut un error 😓, intenta-ho més tard.`);
                    setShowPopup(true);
                });
        } else {
            eventsService.update(eventId, formData)
                .then((response) => {
                    setPopupMessage(`El teu event: ${response.data.name} ha estat actualitzat!`);
                    setShowPopup(true);
                })
                .catch((error) => {
                    setPopupMessage(`Hi ha hagut un error 😓, intenta-ho més tard.`);
                    setShowPopup(true);
                });
        }
    };


    return (
        <div>
            <h1>{isUpdateForm ? "Editar event" : "Nou event"}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" >Nom</label>
                <input
                    required
                    maxLength={15}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="date" >Data</label>
                <input
                    required
                    type="date"
                    name="date"
                    value={formData.date && formatYYYMMDD(formData.date)}
                    onChange={handleChange}
                />
                <label htmlFor="description" >Descripció</label>
                <textarea
                    required
                    maxLength={30}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <label htmlFor="location" >Localitat</label>
                <input
                    required
                    maxLength={15}
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <button type="submit">{isUpdateForm ? "Editar" : "Crear"}</button>
            </form>
        </div>
    );
};

export default EventFormPage;