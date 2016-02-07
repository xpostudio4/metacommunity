const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');

var sponsorSchema = new schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  website: {
    type: String,
  }
});

module.exports = mongoose.model("Sponsor", sponsorSchema);
