const koa = require('koa');
const app = new koa();
const routes = require('koa-route');

function *home(){
  this.body = "Home Page";
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
  this.body = "Speakers";
}

app.use(routes.get('/', home));
app.use(routes.get('/about', about_us));
app.use(routes.get('/events', events));
app.use(routes.get('/donations', donations));
app.use(routes.get('/speakers', speakers));


app.listen(3000);
