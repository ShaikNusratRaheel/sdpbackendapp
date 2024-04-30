const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  file: {
    type: String, //URL
    required: true,
  },
});

const event = mongoose.model('Event', eventSchema);

module.exports = event;