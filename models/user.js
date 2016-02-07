const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');

var UserSchema = new schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: [validator.isEmail],
  },
  // If the user is admin he should have a place where to select which communities
  // he/she belongs to
  admin: {
    type: Boolean,
    default: false
  },
  superadmin: {
    type: Boolean,
    default: false
  },
  speaker: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("User", UserSchema);
