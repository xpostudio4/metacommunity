const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');

var talkEvaluationSchema= new schema({
  facebook_attendees: {
    type: Number,
    required: true,
  },
  facebook_interested: {
    type: Number,
    required: true,
  },
  actual_attendees: {
    type: Number,
  },
  donation: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("TalkEvaluation", talkEvaluationSchema);
