// configuration variables
const path = require('path');
const db_url = process.env.MONGOLAB_URI || 'localhost:27017/meta';
const port = process.env.PORT || 3004;
const templates = { html: 'nunjucks'};
const TEMPORAL_DIR = path.join(process.cwd(), '.tmp');

module.exports = { db_url, port, templates, TEMPORAL_DIR};
