import { useState } from "react";
import './NewEventPage.css';
import { eventsService } from "../services/services";

const NewEventPage = () => {
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
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
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