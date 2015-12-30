const koa = require('koa');
const app = new koa();
const routes = require('koa-route');
const views = require('koa-views');
const monk = require('monk');
const wrap = require('co-monk');
const serve = require('koa-static-folder');

// This library help us to interact with post requests
const parse = require('co-body');

const db = monk('localhost:27017/meta');

// Database tables objects
var users = wrap(db.get('users'));
var talks = wrap(db.get('talk_applications'));
var usergroups = wrap(db.get('usergroups'));


// set static folders
app.use(serve('./assets'));

app.use(views('views', {
  map: { html: 'nunjucks'}
}));

function *home(){
  yield this.render('index', {});
}

function *about_us(){
  this.body = "About Us";
}

function *events(){
  this.body = "Events";
}

function *donations(){
  this.body = "Donations";
}

function *speakers(){

  if(this.method === 'GET'){
    yield this.render('speakers', {});
  }

 if(this.method === 'POST'){
    var talk = yield parse(this);

    if(talk.usergroups.length > 0){

       talks.insert(talk, function(err){
        if(err) throw err;
      });

    console.log(talk);
    yield this.render('speakers', {talk: talk, success: 'yes'});
    }

    if( talk.usergroups.lenght === 0){
      yield this.render('speakers', {'talk': talk});
    }

  }

}

function *usergroup(){
  usergroups.insert({
    name: "Python Dominicana",
    url: "https://www.facebook.com/groups/pythondo/",
    website: "www.python.com.do",
    logo: "https://scontent-mia1-1.xx.fbcdn.net/hphotos-ash2/v/t1.0-9/10624973_10204014303853300_9205003069849326284_n.jpg?oh=7bcdfcda40ccb89341d73ebfe9bcdbb6&oe=570E52D0",
    date_created: new Date("2013-09-25T19:00:00.001Z"),
    description: "Python Dominicana is an amazing place, is the place where Programmers, engineers an all kind of people interested in the Python Computer Language get together to talk, learn and share about all the stuff that can be done with it, from web applications to robots, from distributed systems to desktop apps.",
  }, function(err){
       if(err) throw err
  });

  this.body = "OK";
}

function *users(){

   users.insert({
    first_name: 'Vivian',
    last_name: 'Guillen',
    email: 'vivian@codetiger.co',
    admin: true,
  }, function(err){
      if(err) throw err;
  });

}

app.use(routes.get('/', home));
app.use(routes.get('/about', about_us));
app.use(routes.get('/events', events));
app.use(routes.get('/donations', donations));
app.use(routes.get('/speakers', speakers));
app.use(routes.post('/speakers', speakers));
app.use(routes.get('/usergroup', usergroup));

app.listen(3000);

