const { authJwt } = require("../middlewares");
const controller = require("../controllers/event.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/event/create",[authJwt.verifyToken], controller.createEvent);
  app.get("/api/event/view/all",[authJwt.verifyToken], controller.getAllEvents);
  app.get("/api/event/view/id/:eventId",[authJwt.verifyToken], controller.getEventById);
  app.get('/api/event/user/:userId',[authJwt.verifyToken], controller.getUserEventsByUserID);
  app.put("/api/event/update/:eventId",[authJwt.verifyToken], controller.updateEventById);
  app.delete("/api/event/delete/:eventId",[authJwt.verifyToken,authJwt.isAdmin], controller.deleteEventById);
};
