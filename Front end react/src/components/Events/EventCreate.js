import React, { useState, useEffect } from "react";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import EventService from '../../services/event.service';
import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import UserService from "../../services/user.service";
import { useHistory } from "react-router-dom"; // Import useHistory for redirection
import { handleAuthErrors } from "../../services/ErrorHandling.service";

function EventCreationPage() {
  const history = useHistory(); // Initialize useHistory hook
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    dateTime: null,
    userID: '',
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        handleAuthErrors(error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateTimeChange = (dateTime) => {
    setEventData(prevData => ({
      ...prevData,
      dateTime
    }));
  };

 
  const handleUserChange = (e) => {
    const { value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      userID: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formattedDateTime = eventData.dateTime ? new Date(eventData.dateTime) : null;
        const eventDataToSend = { ...eventData, date: formattedDateTime };
        
        const response = await EventService.createEvent(eventDataToSend);
        
        // Extract event ID from response
        const eventID = response._id;
        
        // Prompt the user with a confirmation dialog
        const createTask = window.confirm("Event created successfully. Do you want to create a task for this event?");
        
        if (createTask) {
          // If the user selects "Yes," redirect them to the task creation page with event ID
          history.push(`/events/tasks/create?eventId=${eventID}`);
        } else {
          // If the user selects "No," redirect them to the event details page
          history.push(`/events/view/id/${eventID}`);
        }
      } catch (error) {
        // Handle error
        console.error('Error creating event:', error);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const validateForm = () => {
    return (
      eventData.title &&
      eventData.description &&
      eventData.location &&
      eventData.dateTime
    );
  };

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <Grid container justifyContent="center">
        <Grid item xs={10} xl={8}>
          <Typography variant="h5" gutterBottom>
            Event Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                label="Title"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                type="text"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                label="Description"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                label="Location"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>Date:</Typography>
              <Datetime
                value={eventData.dateTime}
                onChange={handleDateTimeChange}
                inputProps={{ placeholder: 'Date' }}
                dateFormat="YYYY-MM-DD" // Display only the date without time
                timeFormat = {false}
                utc // Set to UTC mode
                utcOffset={new Date().getTimezoneOffset()} // Set the current time zone offset
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>Time:</Typography>
              <Datetime
                value={eventData.dateTime}
                onChange={handleDateTimeChange}
                inputProps={{ placeholder: 'Time' }}
                dateFormat={false} // Don't display the date, only time
                utc // Set to UTC mode
                utcOffset={new Date().getTimezoneOffset()} // Set the current time zone offset
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>User:</Typography>
              <Select
                fullWidth
                value={eventData.userID}
                onChange={handleUserChange}
              >
                {users.map(user => (
                  <MenuItem key={user.username} value={user.username}>{user.name}</MenuItem>
                ))}
              </Select>
            
            </Grid>
          </Grid>
          <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
            <Button variant="contained" onClick={handleSubmit}>
              Create Event
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default EventCreationPage;
