const path = require('path');
const koa = require('koa');
const views = require('koa-views');
const serve = require('koa-static');
const config = require('./config');
const TEMPORAL_DIR = path.join(process.cwd(), '.tmp');
const router = require('./router');

function createApplication() {
  const app = new koa();

  app.use(serve(TEMPORAL_DIR)); // set static folders
  app.use(views('views', { map: config.templates })); // Identify views and template languages to use

  return router(app);
}

// create and run app
createApplication()
  .listen(config.port);
