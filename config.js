// configuration variables
const db_url = process.env.MONGOLAB_URI || 'localhost:27017/meta';
const port = process.env.PORT || 3004;
const templates = { html: 'nunjucks'};


module.exports = { db_url, port, templates};


