module.exports = function (app, db, routes){
  app.use(routes.get('/communities/create', function *(){
    yield this.render('speakers', context);
  }));
};
