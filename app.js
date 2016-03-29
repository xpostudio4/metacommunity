const path = require('path');
const koa = require('koa');
const router = require('koa-route');
const views = require('koa-views');
const serve = require('koa-static');
const config = require('./config');
const db = require('./db');
// This library help us to interact with post requests
const parse = require('co-body');

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
  homeController: homeController(),
  talkController: talkController(),
  userController: userController(),
  donationController: donationController(),
  eventController: eventController()
});

const homeController = function() {
  return {
    renderHome: function* () {
      yield this.render('index', {});
    },
    renderAboutUs: function* () {
      yield this.render('about_us', {});
    },
    renderContact: function* () {
      yield this.render('contact', {});
    },
    pageNotFound: function* () {
      if( this.status === 404){
        yield this.render('404');
      }
    }
  };
};

const talkController = function () {
  return {
    renderTalkSubmissionForm: function* () {
      const userGroups = yield db.usergroups.find();
      const context = {usergroups: userGroups};

      yield this.render('submit_talk', context);
    },
    submitTalk: function* () {
      // TODO: Only allow a set of specific fields.
      const rawBody = yield parse(this);
      const belongsToUserGroup = rawBody.usergroups && rawBody.usergroups.length;

      // TODO: Render an error message if talk doesn't belong to an user group.
      if (belongsToUserGroup) {
        yield db.talks.create(rawBody);
      }

      return this.redirect('/speakers');
    }
  };
};

const userController = function () {
  return {
    usergroup: function* (){
      var group =  new db.usergroups({
        name: 'Python Dominicana',
        facebook_url: 'https://www.facebook.com/groups/pythondo/',
        website: 'www.python.com.do',
        logo: 'https://scontent-mia1-1.xx.fbcdn.net/hphotos-ash2/v/t1.0-9/10624973_10204014303853300_9205003069849326284_n.jpg?oh=7bcdfcda40ccb89341d73ebfe9bcdbb6&oe=570E52D0',
        created: new Date('2013-09-25T19:00:00.001Z'),
        description: 'Python Dominicana is an amazing place, is the place where Programmers, engineers an all kind of people interested in the Python Computer Language get together to talk, learn and share about all the stuff that can be done with it, from web applications to robots, from distributed systems to desktop apps.'
      });
      group.save(function(err){
        if(err) throw err;
      });

      this.body = 'OK';
    },
    users: function* () {
      db.users.insert({
        first_name: 'Vivian',
        last_name: 'Guillen',
        email: 'vivian@codetiger.co',
        admin: true
      }, function(err){
        if(err) throw err;
      });
    }
  };
};

const donationController = function () {
  return {
    renderDonations: function* (){
      yield this.render('donations', {});
    }
  };
};

const eventController = function () {
  return {
    renderEvents: function* (){
      yield this.render('events', {});
    }
  };
};
