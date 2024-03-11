import axios from "axios";

class EventsService {
    constructor() {
        this.API_URL = import.meta.env.VITE_API_URL;
        this.api = axios.create({
            baseURL: this.API_URL
        });
    }

    getAll() {
        return this.api.get("/events");
    }

    getOne(id) {
        return this.api.get(`/events/${id}`);
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