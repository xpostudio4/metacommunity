module.exports = function (app, db, routes){
  app.use(routes.get('/', function *(){
    yield this.render('index', {});
  }));
  app.use(routes.get('/about', function *(){
    yield this.render('about_us', {});
  }));
  app.use(routes.get('/donations', function *(){
    yield this.render('donations', {});
  }));
};
