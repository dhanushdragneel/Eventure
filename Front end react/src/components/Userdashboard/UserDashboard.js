import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, CircularProgress, Grid, Card, CardContent, Button, TextField, MenuItem, Box } from '@material-ui/core';
import EventService from "../../services/event.service";
import TaskService from "../../services/task.service";
import AuthService from "../../services/auth.service";
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        await Promise.all([fetchUserEvents(currentUser.id), fetchUserTasks(currentUser.id)]);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const filtered = events.filter(event => {
      const searchLowerCase = searchQuery.toLowerCase();
      return event.title.toLowerCase().includes(searchLowerCase) || event.description.toLowerCase().includes(searchLowerCase);
    });
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  useEffect(() => {
    const applyFilter = () => {
      let filteredByDate = [...events];
      if (startDate && endDate) {
        filteredByDate = events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= startDate && eventDate <= endDate;
        });
      }
      setFilteredEvents(filteredByDate);
    };

    applyFilter();
  }, [startDate, endDate, events]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const fetchUserEvents = async (userID) => {
    try {
      const response = await EventService.getUserEvents(userID);
      setEvents(response);
    } catch (error) {
      console.error("Error fetching user events: ", error);
    }
  };

  const fetchUserTasks = async (userID) => {
    try {
      const response = await TaskService.getUserTasks(userID);
      setTasks(response);
    } catch (error) {
      console.error("Error fetching user tasks: ", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedTasks = tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Welcome, {user ? user.username : "User"}
      </Typography>
      <div className={styles.toolbar}>
        <Link to="/events/create">
          <Button variant="contained" color="primary">Create New Event</Button>
        </Link>
        <TextField
          label="Search Events"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchBar}
        />
        <TextField
          select
          label="Filter Events"
          variant="outlined"
          value={filterType}
          onChange={handleFilterChange}
          className={styles.filter}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="this-week">This Week</MenuItem>
          {/* Add more filter options as needed */}
        </TextField>
        <Box display="flex">
          <TextField
            label="Start Date"
            type="date"
            variant="outlined"
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleStartDateChange(new Date(e.target.value))}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleEndDateChange(new Date(e.target.value))}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Typography variant="h4" gutterBottom>Overview of upcoming events:</Typography>
          <Grid container spacing={2}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Link to={`/events/view/id/${event._id}`} style={{ textDecoration: 'none' }}>
                  <Card className={styles.card}>
                    <CardContent>
                      <Typography variant="h5" component="h2">{event.title}</Typography>
                      <Typography variant="body2" component="p">{event.description}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h4" gutterBottom>Tasks assigned to you:</Typography>
          <Grid container spacing={2}>
            {sortedTasks.map((task) => (
              <Grid item xs={12} key={task._id}>
                <Card className={styles.taskCard}>
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body1">{task.description}</Typography>
                    <Typography variant="body2" color="textSecondary">Deadline: {new Date(task.deadline).toLocaleDateString()}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default UserDashboard;
