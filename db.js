
const config = require('./config');
const monk = require('monk');
const wrap = require('co-monk');
const db = module.exports = monk(config.db_url);

// Database tables objects
module.exports.users = wrap(db.get('users'));
module.exports.talks = wrap(db.get('talk_applications'));
module.exports.usergroups = wrap(db.get('usergroups'));


