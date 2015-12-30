// validate emails with details in
// http://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  // If the user is admin he should have a place where to select which communities
  // he/she belongs to
  admin: {
    type: Boolean,
    default: false
  },
  speaker: {
    type: Boolean,
    default: true
  }
});

mongoose.model("User", UserSchema);


