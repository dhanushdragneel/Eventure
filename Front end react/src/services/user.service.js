import api from "./api";
import AuthService from "./auth.service";

const getPublicContent = () => {
  return api.get("/test/all");
};

const getUserBoard = () => {
  return api.get("/test/user");
};
const isAdmin = () => {
  const user = AuthService.getCurrentUser();
  return user.roles.includes("ROLE_ADMIN");
};
const isModerator = () => {
  const user = AuthService.getCurrentUser();
  return user.roles.includes("ROLE_MODERATOR");
};

const getModeratorBoard = () => {
  return api.get("/test/mod");
};

const getAdminBoard = () => {
  return api.get("/test/admin");
};
const getAllUsers =() =>{
  return api.get("/users/view/all",{ headers: AuthService.authHeader()});
}


const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUsers,
  isModerator,
  isAdmin,
};

export default UserService;
