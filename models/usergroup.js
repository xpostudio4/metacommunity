const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');

var usergroupSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  facebook_url: {
    type: String,
    validate: [validator.isURL],
  },
  website: {
    type: String,
    validate: [validator.isURL],
  },
  logo:{
    type: String,
    required: true
  },
  created: {
    type: Date,
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Please fill a valid email address'],
  },
  approved: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model("UserGroup", usergroupSchema);


