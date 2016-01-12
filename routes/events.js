module.exports = function (app, db, routes){
  app.use(routes.get('/events', function *(){
    yield this.render('events', {});
  }));
};
