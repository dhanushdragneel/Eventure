const { authJwt } = require("../middlewares");
const controller = require("../controllers/task.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/task/create",[authJwt.verifyToken], controller.createTask);
  app.get("/api/task/view/all",[authJwt.verifyToken], controller.getAllTasks);
  app.get("/api/task/user/:userId",[authJwt.verifyToken], controller.getUserTasksByUserID);
  app.get("/api/task/event/:eventId",[authJwt.verifyToken], controller.getTaskByEventID);
  app.get("/api/task/view/:eventId",[authJwt.verifyToken], controller.getTaskById);
  app.put("/api/task/update/:eventId",[authJwt.verifyToken], controller.updateTaskById);
  app.delete("/api/task/delete/:eventId",[authJwt.verifyToken, authJwt.isModerator], controller.deleteTaskById);
};
