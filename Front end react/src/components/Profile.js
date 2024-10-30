import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AuthService from "../services/auth.service";
import { handleAuthErrors } from "../services/ErrorHandling.service";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [editable, setEditable] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    setEditedUsername(currentUser.username);
    setEditedEmail(currentUser.email);
  }, []);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    // Perform save operation here, like updating user details
    setEditable(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };
  const handleChangePassword = async () => {
    try {
      // Assuming you have access to the current user's ID
      const userId = currentUser.id;
      await AuthService.changePassword(userId, oldPassword, newPassword);
      setOldPassword("");
      setNewPassword("");
      handleTogglePasswordFields();
      console.log("Password changed successfully!");
    } catch (error) {
      handleAuthErrors(error);
    }
  };
  

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        {currentUser.username.charAt(0).toUpperCase()}
      </Avatar>
      <h3>
        Id: {currentUser.id}
        <br />
        <strong>{currentUser.username}</strong> Profile
      </h3>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={editedUsername}
          disabled={!editable}
          onChange={(e) => setEditedUsername(e.target.value)}
        />
        {/* Editable Email field */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={editedEmail}
          disabled={!editable}
          onChange={(e) => setEditedEmail(e.target.value)}
        />
        {/* Change Password button */}
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleTogglePasswordFields}
        >
          {showPasswordFields ? "Cancel" : "Change Password"}
        </Button>
        {/* Password changing options */}
        {showPasswordFields && (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type={showPassword ? "text" : "password"}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </>
        )}
        {/* Edit and Save buttons */}
        {editable ? (
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSave}
          >
            Save
          </Button>
        ) : (
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
      </form>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
