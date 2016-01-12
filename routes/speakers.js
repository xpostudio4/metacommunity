module.exports = function (app, db, routes){
  app.use(routes.get('/speakers', function *(){
    var  context =  {'usergroups': yield db.usergroups.find({})};
    yield this.render('speakers', context);
  }));
  app.use(routes.post('/speakers', function *(){
    var  context =  {'usergroups': yield db.usergroups.find({})};
    var talk = yield parse(this);
    if(talk.usergroups.length > 0){
      talks.insert(talk, function(err){
        if(err) throw err;
      });
      context.talk = talk;
      context.success = true;
      console.log(talk);
      yield this.render('speakers', context);

    }
    if( talk.usergroups.lenght === 0){
      yield this.render('speakers', context);
    }
  }));
};
