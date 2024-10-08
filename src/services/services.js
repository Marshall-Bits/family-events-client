import axios from "axios";

class EventsService {
    constructor() {
        this.API_URL = import.meta.env.VITE_API_URL;
        this.api = axios.create({
            baseURL: this.API_URL,
            withCredentials: false,
        });
    }

    getAll() {
        return this.api.get("/events");
    }

    getOne(id) {
        return this.api.get(`/events/${id}`);
    }

    update(id, event) {
        return this.api.put(`/events/${id}`, event);
    }

    delete(id) {
        return this.api.delete(`/events/${id}`);
    }

    addParticipant(eventId, userId) {
        return this.api.post(`/events/${eventId}/participants`, { userId });
    }

    deleteParticipant(eventId, userId) {
        return this.api.delete(`/events/${eventId}/participants/${userId}`);
    }

    create(event) {
        return this.api.post("/events", event);
    }

    addExtraParticipant(eventId, participant) {
        return this.api.post(`/events/${eventId}/extra-participants`, participant);
    }

    deleteExtraParticipant(eventId, name) {
        return this.api.delete(`/events/${eventId}/extra-participants/${name}`);
    }
}

class UserService {
    constructor() {
        this.API_URL = import.meta.env.VITE_API_URL;
        this.api = axios.create({
            baseURL: this.API_URL
        });
    }

    getAll() {
        return this.api.get("/users");
    }

    getOne(id) {
        return this.api.get(`/users/${id}`);
    }

    create(user) {
        return this.api.post("/users", user);
    }

}

const eventsService = new EventsService();
const userService = new UserService();

export { eventsService, userService };