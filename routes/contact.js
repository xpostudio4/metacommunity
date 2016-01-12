module.exports = function (app, db, routes){
  app.use(routes.get('/contact', function *(){
    yield this.render('contact', {});
  }));
};
