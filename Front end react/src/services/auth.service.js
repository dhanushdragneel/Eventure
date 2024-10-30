import api from "./api";
import TokenService from "./token.service";

const register = (name,username, email, password) => {
  return api.post("/auth/signup", {
    name,
    username,
    email,
    password
  });
};

function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };

  } else {
    return {};
  }
}

const login = (username, password) => {
  return api
    .post("/auth/signin", {
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const getAccessToken = () => {
  const currentUser = localStorage.getItem("user");
  return currentUser.accessToken;
};
const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const response = await api.put(`/user/changePassword/${userId}`, { oldPassword, newPassword }, { headers: authHeader()});
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAccessToken,
  authHeader,
  changePassword
};

export default AuthService;
