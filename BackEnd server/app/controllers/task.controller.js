const Task = require('../models/task.model');
const User = require('../models/user.model');
const Participant = require("../models/participants.model")

exports.createTask = async (req, res) => {
  try {
    const assignee = await User.findOne({ username: req.body.assigneeID });
      if (!assignee) { 
        return res.status(404).json({ message: 'User not found' });
      }
    const TaskData = { ...req.body, assigneeID: assignee._id };
    const task = new Task(TaskData);
    await task.save();
    const eventID = req.body.EventID;
    const userID = req.body.assigneeID;
    const Role = "participant";
    // Create a new participant instance
    const participant = new Participant({
      UserID: userID,
      EventID: eventID,
      Role: Role,
    });

    res.status(201).json(TaskData);
  } catch (err) {
    res.status(400).json({ message: err.message + " error from create task " + req.body.assigneeID});
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getTaskByEventID = async (req, res) => {
  try {
    const eventId = req.params.eventId; // Extract the user ID from the request parameters

    // Find all events associated with the user
    const tasks = await Task.find({ eventID: eventId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getUserTasksByUserID = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract the user ID from the request parameters


    const tasks = await Task.find({ assigneeID: userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTaskById = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
