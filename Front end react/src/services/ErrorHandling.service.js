export const handleAuthErrors = (error, history) => {
    if (error.message && error.message.includes("No token provided!")) {
      // Redirect the user to the login page if no token is provided
      history.replace("/login");
    } else if (error.response && error.response.status === 403) {
      // Redirect the user to the login page if token is invalid or expired
      history.replace("/login");
    } else {
      // Handle other errors
      console.error("Error:", error);
    }
  };
