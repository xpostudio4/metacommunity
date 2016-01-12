const koa = require('koa');
const app = module.exports =  new koa();
const routes = require('koa-route');
const views = require('koa-views');
const serve = require('koa-static');
const config = require('./config');
const db = require('./db');
const fs = require('fs');

// This library help us to interact with post requests
const parse = require('co-body');

// set static folders
app.use(serve('./assets'));

// Identify views files and template languages to use
app.use(views('views', {
  map: config.templates
}));

fs.readdirSync('./routes/').forEach(function(file) {
    var route='./routes/'+file;
    require(route)(app,db,routes);
});

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

app.use(pageNotFound);
app.listen(config.port);
