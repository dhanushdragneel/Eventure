const Participant = require('../models/participants.model');
const User = require('../models/user.model');

exports.createParticipant = async (req, res) => {
  try {
    const participant = new Participant(req.body);
    await participant.save();
    res.status(201).json(participant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getParticipantsByEventId = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    
    // Find participants by event ID
    const participants = await Participant.find({ EventID: eventId });

    // Extract user IDs from participants
    const participantUserIds = participants.map(participant => participant.UserID);

    // Use aggregation to join participants with users and project required fields
    const users = await User.aggregate([
      {
        $match: { _id: { $in: participantUserIds } }
      },
      {
        $lookup: {
          from: "participants",
          localField: "_id",
          foreignField: "UserID",
          as: "participant"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          username: 1,
          Role: { $arrayElemAt: ["$participant.Role", 0] }
        }
      }
    ]);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.participantId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    res.json(participant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndUpdate(req.params.participantId, req.body, { new: true });
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    if (participant.Role === "organizer") {
      // Perform an action if the participant's role is "organizer"
      await Event.findByIdAndUpdate(participant.eventID, { UserID: participant.UserID }, { new: true });
    }
    res.json(participant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndDelete(req.params.participantId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    res.json({ message: 'Participant deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
