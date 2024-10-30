import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import EventService from "../../services/event.service";
import TaskService from "../../services/task.service";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { handleAuthErrors } from "../../services/ErrorHandling.service";


const EventDetails = () => {
  const { eventId } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [editEvent, setEditEvent] = useState(false);
  const [editTasks, setEditTasks] = useState(false);
  const [editParticipants, setEditParticipants] = useState(false);

  const fetchEventData = async () => {
    try {
      // Fetch event details
      const eventResponse = await EventService.getEventById(eventId);
      setEvent(eventResponse);

      // Fetch tasks associated with the event ID
      const tasksResponse = await TaskService.getTasksByEventId(eventId);
      setTasks(tasksResponse);

      // Fetch participants of the event
      const participantsResponse = await EventService.getParticipantsByEventId(eventId);
      setParticipants(participantsResponse);
    } catch (error) {
      handleAuthErrors(error, history);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [eventId, history]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      // Refetch event details, tasks, and participants when the route changes
      fetchEventData();
    });

    return () => {
      // Cleanup the listener when the component unmounts
      unlisten();
    };
  }, [eventId, history]);

  const handleSaveEvent = async () => {
    const eventdataTosend ={
      title : event.title,
      description : event.description,
      location : event.location,
      date : (event.date ? new Date(event.date) : null),
    };
    try {
      const response = await EventService.updateEventById(event._id, eventdataTosend);
      // Save edited event details
      // Call a function to save the changes
      setEditEvent(false); // Disable edit mode
    } catch (error) {
      // Handle errors
      console.error('Error occurred while saving event:', error);
      // Optionally handle error display or logging
    }
  };
  
  const handleSaveTasks = async () => {
    const tasksDataToSend = tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline ? new Date(task.deadline) : null
    }));
  
    try {
      await Promise.all(tasksDataToSend.map(task => TaskService.updateTaskById(task.id, task)));
      // Call a function to save the changes
      setEditTasks(false); // Disable edit mode
    } catch (error) {
      // Handle errors
      console.error('Error occurred while saving tasks:', error);
      // Optionally handle error display or logging
    }
  };

  const handleSaveParticipants = async () => {
    const participantsDataToSend = participants.map(participant => ({
      id: participant.id,
      name: participant.name,
      role: participant.role
    }));
  
    try {
      await Promise.all(participantsDataToSend.map(participant => EventService.updateParticipantById(participant.id, participant)));
      // Call a function to save the changes
      setEditParticipants(false); // Disable edit mode
    } catch (error) {
      // Handle errors
      console.error('Error occurred while saving participants:', error);
      // Optionally handle error display or logging
    }
  };
  

  const handleParticipantChange = (participantId, newName) => {
    // Update the name of the participant in the state
    const updatedParticipants = participants.map(participant =>
      participant.id === participantId ? { ...participant, name: newName } : participant
    );
    setParticipants(updatedParticipants);
  };

  const handleCreateNewTask = () => {
    history.push(`/events/tasks/create?eventId=${eventId}`);
  };

  return (
    <div className="container">
      {event ? (
        <div>
          <h2>
            {editEvent ? (
              <input
                type="text"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
              />
            ) : (
              event.title
            )}
          </h2>
          <p>
            <strong>Description:</strong>{" "}
            {editEvent ? (
              <textarea
                value={event.description}
                onChange={(e) =>
                  setEvent({ ...event, description: e.target.value })
                }
              />
            ) : (
              event.description
            )}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {editEvent ? (
              <input
                type="date"
                value={event.date.split("T")[0]}
                onChange={(e) => setEvent({ ...event, date: `${e.target.value}T${event.date.split("T")[1]}` })}
              />
            ) : (
              new Date(event.date).toLocaleDateString()
            )}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {editEvent ? (
              <input
                type="time"
                value={event.date.split("T")[1]}
                onChange={(e) => setEvent({ ...event, date: `${event.date.split("T")[0]}T${e.target.value}` })}
              />
            ) : (
              new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            )}
          </p>
          <p>
            <strong>Location:</strong>{" "}
            {editEvent ? (
              <input
                type="text"
                value={event.location}
                onChange={(e) => setEvent({ ...event, location: e.target.value })}
              />
            ) : (
              event.location
            )}
          </p>
          <Button onClick={() => setEditEvent(!editEvent)}>
            {editEvent ? "Cancel" : "Edit Event"}
          </Button>
          {editEvent && (
            <Button onClick={handleSaveEvent}>Save Changes</Button>
          )}
          <h3>Participants:</h3>
          <ul>
            {participants.map((participant) => (
              <li key={participant.id}>
                {editParticipants ? (
                  <>
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) =>
                        handleParticipantChange(participant.id, e.target.value)
                      }
                    />
                    <span>Role: {participant.Role}      </span>
                  </>
                ) : (
                  <>
                    <span>Name: {participant.name}</span>
                    <br/>
                    <span>Role: {participant.Role}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
          <Button onClick={() => setEditParticipants(!editParticipants)}>
            {editParticipants ? "Cancel" : "Edit Participants"}
          </Button>
          {editParticipants && (
            <Button onClick={handleSaveParticipants}>Save Changes</Button>
          )}
          <h3>Tasks:</h3>
          <div className="task-list">
            {tasks.map((task) => (
              <Card key={task.id} className="task-card">
                <CardContent>
                  <h4>
                    {editTasks ? (
                      <input
                        type="text"
                        value={task.title}
                        onChange={(e) => setTasks({ ...task, title: e.target.value })}
                      />
                    ) : (
                      task.title
                    )}
                  </h4>
                  <p>
                    {editTasks ? (
                      <textarea
                        value={task.description}
                        onChange={(e) => setTasks({ ...task, description: e.target.value })}
                      />
                    ) : (
                      task.description
                    )}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {editTasks ? (
                      <input
                        type="text"
                        value={task.status}
                        onChange={(e) => setTasks({ ...task, status: e.target.value })}
                      />
                    ) : (
                      task.status
                    )}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {editTasks ? (
                      <input
                        type="datetime-local"
                        value={task.deadline}
                        onChange={(e) => setTasks({ ...task, deadline: e.target.value })}
                      />
                    ) : (
                      new Date(task.deadline).toLocaleString()
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button onClick={() => setEditTasks(!editTasks)}>
            {editTasks ? "Cancel" : "Edit Tasks"}
          </Button>
          {editTasks && <Button onClick={handleSaveTasks}>Save Changes</Button>}
          <Button onClick={handleCreateNewTask}>Create New Task</Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EventDetails;
