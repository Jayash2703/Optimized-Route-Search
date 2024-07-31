const mongoose = require('mongoose');

const robotSchema = new mongoose.Schema({
  id: { type: String, required: true },
  batteryLevel: { type: Number, required: true },
  currentTask: { type: String, required: false },
});

const Robot = mongoose.model('Robot', robotSchema);

module.exports = Robot;
