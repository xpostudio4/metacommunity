const path = require('path');
const koa = require('koa');
const router = require('koa-route');
const views = require('koa-views');
const serve = require('koa-static');
const config = require('./config');
const db = require('./db');
const controllers = require('./controllers');

const TEMPORAL_DIR = path.join(process.cwd(), '.tmp');

function createApplication(controllers) {
  const homeController = controllers.homeController;
  const talkController = controllers.talkController;
  const userController = controllers.userController;
  const donationController = controllers.donationController;
  const eventController = controllers.eventController;

  const app = module.exports = new koa();
  // set static folders
  app.use(serve(TEMPORAL_DIR));
  // Identify views files and template languages to use
  app.use(views('views', {
    map: config.templates
  }));

  app.use(router.get('/', homeController.renderHome));
  app.use(router.get('/about', homeController.renderAboutUs));
  app.use(router.get('/contact', homeController.renderContact));
  app.use(router.get('/donations', donationController.renderDonations));
  app.use(router.get('/events', eventController.renderEvents));
  app.use(router.get('/speakers', talkController.renderTalkSubmissionForm));
  app.use(router.post('/speakers', talkController.submitTalk));
  app.use(router.get('/usergroup', userController.usergroup));
  app.use(homeController.pageNotFound);

  app.listen(config.port);
}

// create and run app
createApplication({
  homeController: controllers.homeController(db),
  talkController: controllers.talkController(db),
  userController: controllers.userController(db),
  donationController: controllers.donationController(db),
  eventController: controllers.eventController(db)
});
