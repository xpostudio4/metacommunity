function userController(db) {
  return {
    usergroup: function* (){
      var group =  new db.usergroups({
        name: 'Python Dominicana',
        facebook_url: 'https://www.facebook.com/groups/pythondo/',
        website: 'www.python.com.do',
        logo: 'https://scontent-mia1-1.xx.fbcdn.net/hphotos-ash2/v/t1.0-9/10624973_10204014303853300_9205003069849326284_n.jpg?oh=7bcdfcda40ccb89341d73ebfe9bcdbb6&oe=570E52D0',
        created: new Date('2013-09-25T19:00:00.001Z'),
        description: 'Python Dominicana is an amazing place, is the place where Programmers, engineers an all kind of people interested in the Python Computer Language get together to talk, learn and share about all the stuff that can be done with it, from web applications to robots, from distributed systems to desktop apps.'
      });
      group.save(function(err){
        if(err) throw err;
      });

      this.body = 'OK';
    },
    users: function* () {
      db.users.insert({
        first_name: 'Vivian',
        last_name: 'Guillen',
        email: 'vivian@codetiger.co',
        admin: true
      }, function(err){
        if(err) throw err;
      });
    }
  };
}

module.exports = userController;
