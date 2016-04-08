const routes = require('./routes');

module.exports = function router(app) {
  app.use(routes.donation);
  app.use(routes.event);
  app.use(routes.home);
  app.use(routes.talk);
  app.use(routes.user);
  app.use(routes.sponsor);
  app.use(function* () {
    if( this.status === 404){
      yield this.render('404');
    }
  });

  return app;
};
