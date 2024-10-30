  import React, { useState, useEffect } from "react";
  import {
    Button,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
  import Datetime from "react-datetime";
  import "react-datetime/css/react-datetime.css";
  import TaskService from "../../services/task.service";
  import UserService from "../../services/user.service";
  import { useHistory } from "react-router-dom";
  import { useLocation } from "react-router-dom";
  import { handleAuthErrors } from "../../services/ErrorHandling.service";

  function CreateTaskPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventId = searchParams.get("eventId");
    const history = useHistory();

    const [taskData, setTaskData] = useState({
      title: "",
      description: "",
      status: "",
      deadline: null,
      assigneeID: "",
      eventID: eventId, // Received from EventCreationPage
    });
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

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
      setTaskData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleDateTimeChange = (dateTime) => {
      setTaskData((prevData) => ({
        ...prevData,
        deadline: dateTime,
      }));
    };

    const handleAssigneeChange = (e) => {
      const { value } = e.target;
      setTaskData((prevData) => ({
        ...prevData,
        assigneeID: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const formattedDateTime = taskData.deadline
            ? new Date(taskData.deadline)
            : null;
          const TaskDataToSend = { ...taskData, date: formattedDateTime };

          await TaskService.createTask(TaskDataToSend);

          setOpenDialog(true);
        } catch (error) {
          console.error("Error creating task:", error);
        }
      } else {
        alert("Please fill in all required fields.");
      }
    };

    const handleAddAnotherTask = () => {
      setTaskData({
        title: "",
        description: "",
        status: "",
        deadline: null,
        assigneeID: "",
        eventID: eventId,
      });
      setOpenDialog(false);
    };

    const handleNavigateToEventDetails = () => {
      history.push(`/events/view/id/${eventId}`);
    };

    const validateForm = () => {
      return (
        taskData.title &&
        taskData.description &&
        taskData.status &&
        taskData.deadline &&
        taskData.assigneeID
      );
    };

    return (
      <div style={{ height: "100vh", overflow: "auto" }}>
        <Grid container justifyContent="center">
          <Grid item xs={10} xl={8}>
            <Typography variant="h5" gutterBottom>
              Task Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="title"
                  value={taskData.title}
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
                  value={taskData.description}
                  onChange={handleChange}
                  label="Description"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  label="Status"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Date:</Typography>
                <Datetime
                  value={taskData.deadline}
                  onChange={handleDateTimeChange}
                  inputProps={{ placeholder: "Date" }}
                  dateFormat="YYYY-MM-DD"
                  utc
                  utcOffset={new Date().getTimezoneOffset()}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Time:</Typography>
                <Datetime
                  value={taskData.deadline}
                  onChange={handleDateTimeChange}
                  inputProps={{ placeholder: "Time" }}
                  dateFormat={false}
                  utc
                  utcOffset={new Date().getTimezoneOffset()}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Assignee:</Typography>
                <Select
                  fullWidth
                  value={taskData.assigneeID}
                  onChange={handleAssigneeChange}
                >
                  {users.map((user) => (
                    <MenuItem key={user.username} value={user.username}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
              <Button variant="contained" onClick={handleSubmit}>
                Create Task
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Dialog for adding another task */}
        <Dialog open={openDialog}>
          <DialogTitle>Task Created Successfully</DialogTitle>
          <DialogContent>
            Do you want to add another task for the same event?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddAnotherTask}>Yes</Button>
            <Button onClick={handleNavigateToEventDetails}>No</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  export default CreateTaskPage;
