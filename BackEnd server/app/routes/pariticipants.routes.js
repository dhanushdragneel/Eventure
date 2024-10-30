const { authJwt } = require("../middlewares");
const controller = require("../controllers/participants.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/participants/create",[authJwt.verifyToken], controller.createParticipant);
  app.get("/api/participants/view/all",[authJwt.verifyToken], controller.getAllParticipants);
  app.get("/api/event/participants/:eventId",[authJwt.verifyToken],controller.getParticipantsByEventId)
  app.get("/api/participants/view/id/:participantId",[authJwt.verifyToken], controller.getParticipantById);
  app.put("/api/participants/update/:participantId",[authJwt.verifyToken], controller.updateParticipantById);
  app.get("/api/participants/delete/:participantId",[authJwt.verifyToken], controller.deleteParticipantById);
};
