const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Get all the users
  app.get('/api/users/view/all',[authJwt.verifyToken], controller.getAllUsers);
// Get user by ID
  app.get('/api/users/view/id/:userId',[authJwt.verifyToken], controller.getUserById);
  app.put('/api/user/changePassword/:userId',[authJwt.verifyToken],controller.changeUserPassword);

// Update user by ID

  app.put('/api/users/update/:userId',[authJwt.verifyToken,authJwt.isAdmin], controller.updateUserById);

// Delete user by ID
  app.delete('/api/users/delete/:userId',[authJwt.verifyToken,authJwt.isAdmin], controller.deleteUserById);
};
