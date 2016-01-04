const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');

var talkApplication = new schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  proposed_date: {
    type: Date,
  },
  directions: {
    type: String
  }
});

module.exports = mongoose.model("TalkApplication", talkApplication);

