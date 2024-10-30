import React, { useState, useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import { Container, Grid, Typography, Card, CardContent, TextField, MenuItem } from "@mui/material";
import EventService from "../../services/event.service";
import { handleAuthErrors } from "../../services/ErrorHandling.service";


const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const history = useHistory();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await EventService.getAllEvents();
        setEvents(response);
      } catch (error) {
        handleAuthErrors(error, history);
      }
    };

    fetchEvents();
  }, [history]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredEvents = events.filter((event) => {
    const searchLowerCase = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(searchLowerCase) ||
      event.description.toLowerCase().includes(searchLowerCase)
    );
  });

  const filteredAndSortedEvents = filteredEvents.filter((event) => {
    if (filterValue === "all") {
      return true;
    } else if (filterValue === "upcoming") {
      return new Date(event.date) > new Date();
    } else if (filterValue === "past") {
      return new Date(event.date) <= new Date();
    }
    return true;
  });

  return (
    <Container>
      <Typography variant="h2" gutterBottom>All Events</Typography>
      <TextField
        label="Search Events"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Filter Events"
        value={filterValue}
        onChange={handleFilterChange}
        variant="outlined"
        fullWidth
        margin="normal"
      >
        <MenuItem value="all">All Events</MenuItem>
        <MenuItem value="upcoming">Upcoming Events</MenuItem>
        <MenuItem value="past">Past Events</MenuItem>
      </TextField>
      <Grid container spacing={2}>
        {filteredAndSortedEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Link to={`/events/view/id/${event._id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventPage;
