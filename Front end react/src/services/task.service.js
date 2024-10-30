import axios from 'axios';
import { API_URL } from '../configuration/api.config';
import AuthService from './auth.service';

const TaskService = {
  // Create a new task
  createTask: async (taskData) => {
    try {

      const response = await axios.post(`${API_URL}/task/create`, taskData,{ headers: AuthService.authHeader()});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  getTasksByEventId: async (eventId) => {
    try {
      const response = await axios.get(`${API_URL}/task/event/${eventId}`,{ headers: AuthService.authHeader()});

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  
  getUserTasks: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/task/user/${userId}`,{ headers: AuthService.authHeader()});

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/task/view/all`,{ headers: AuthService.authHeader()});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  

  // Get task by ID
  getTaskById: async (taskId) => {
    try {
      const response = await axios.get(`${API_URL}/task/view/${taskId}`,{ headers: AuthService.authHeader()});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Update task by ID
  updateTaskById: async (taskId, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/task/update/${taskId}`, taskData,{ headers: AuthService.authHeader()});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Delete task by ID
  deleteTaskById: async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/task/delete/${taskId}`,{ headers: AuthService.authHeader()});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
};

export default TaskService;