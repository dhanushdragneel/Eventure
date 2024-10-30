import axios from 'axios';
import { API_URL } from '../configuration/api.config';
import AuthService from './auth.service';


const EventService = {
  // Create a new event
  createEvent: async (eventData) => {
    try {

      const response = await axios.post(`${API_URL}/event/create`,eventData,{ headers: AuthService.authHeader()});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  
  
  

  updateParticipantById: async (participantId, participantsDataToSend) => {
    try {
      const response = await axios.put(`${API_URL}/participants/update/${participantId}`, participantsDataToSend,{ headers: AuthService.authHeader()});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },


  getParticipantsByEventId: async (eventId) => {
    try {

      const response = await axios.get(`${API_URL}/event/participants/${eventId}`,{ headers: AuthService.authHeader()});

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  
  getUserEvents: async (userId) => {
    try {

      const response = await axios.get(`${API_URL}/event/user/${userId}`,{ headers: AuthService.authHeader()});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Get all events
  getAllEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/event/view/all`,{ headers: AuthService.authHeader()});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Get event by ID
  getEventById: async (eventId) => {
    try {
      const response = await axios.get(`${API_URL}/event/view/id/${eventId}`,{ headers: AuthService.authHeader()} );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Update event by ID
  updateEventById: async (eventId, eventData) => {
    try {
      const response = await axios.put(`${API_URL}/event/update/${eventId}`, eventData,{ headers: AuthService.authHeader()});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Delete event by ID
  deleteEventById: async (eventId) => {
    try {
      const response = await axios.post(`${API_URL}/event/delete/${eventId}`,{ headers: AuthService.authHeader()});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
};

export default EventService;