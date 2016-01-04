const config = require('./config');
const monk = require('monk');
const wrap = require('co-monk');
const mongoose = require('mongoose');
const db = module.exports = mongoose.connect(config.db_url);

const talks = module.exports.talks = require('./models/talk_application');
const users = module.exports.users = require('./models/user');
const usergroups = module.exports.usergroups = require('./models/usergroup');
const sponsors = module.exports.sponsors = require('./models/sponsor');
