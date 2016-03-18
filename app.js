const path = require('path');

const koa = require('koa');
const app = module.exports =  new koa();
const routes = require('koa-route');
const views = require('koa-views');
const serve = require('koa-static');
const config = require('./config');
const db = require('./db');
// This library help us to interact with post requests
const parse = require('co-body');

const TEMPORAL_DIR = path.join(process.cwd(), '.tmp');

// set static folders
app.use(serve(TEMPORAL_DIR));

// Identify views files and template languages to use
app.use(views('views', {
  map: config.templates
}));

function *renderHome(){
  yield this.render('index', {});
}

function *renderAboutUs(){

  yield this.render('about_us', {});
}

function *renderContact(){
  yield this.render('contact', {});
}

function *renderDonations(){
  yield this.render('donations', {});
}

function *renderEvents(){
  yield this.render('events', {});
}

function *renderTalkSubmissionForm() {
  const userGroups = yield db.usergroups.find();
  const context = {usergroups: userGroups};

  yield this.render('submit_talk', context);
}

function *submitTalk() {
  // TODO: Only allow a set of specific fields.
  const rawBody = yield parse(this);
  const belongsToUserGroup = rawBody.usergroups && rawBody.usergroups.length;

  // TODO: Render an error message if talk doesn't belong to an user group.
  if (belongsToUserGroup) {
    yield db.talks.create(rawBody);
  }

  return this.redirect('/speakers');
}

function *usergroup(){
 var group =  new db.usergroups({
    name: "Python Dominicana",
    facebook_url: "https://www.facebook.com/groups/pythondo/",
    website: "www.python.com.do",
    logo: "https://scontent-mia1-1.xx.fbcdn.net/hphotos-ash2/v/t1.0-9/10624973_10204014303853300_9205003069849326284_n.jpg?oh=7bcdfcda40ccb89341d73ebfe9bcdbb6&oe=570E52D0",
    created: new Date("2013-09-25T19:00:00.001Z"),
    description: "Python Dominicana is an amazing place, is the place where Programmers, engineers an all kind of people interested in the Python Computer Language get together to talk, learn and share about all the stuff that can be done with it, from web applications to robots, from distributed systems to desktop apps.",
  });
  group.save(function(err){
       if(err) throw err
  });

  this.body = "OK";
}

function *users(){

   db.users.insert({
    first_name: 'Vivian',
    last_name: 'Guillen',
    email: 'vivian@codetiger.co',
    admin: true,
  }, function(err){
      if(err) throw err;
  });

}

function *pageNotFound(){
  if( this.status === 404){
    yield this.render('404');
  }
}


app.use(routes.get('/', renderHome));
app.use(routes.get('/about', renderAboutUs));
app.use(routes.get('/contact', renderContact));
app.use(routes.get('/donations', renderDonations));
app.use(routes.get('/events', renderEvents));
app.use(routes.get('/speakers', renderTalkSubmissionForm));
app.use(routes.post('/speakers', submitTalk));
app.use(routes.get('/usergroup', usergroup));
app.use(pageNotFound);


app.listen(config.port);
