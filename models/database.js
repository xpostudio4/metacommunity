const Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://meta:meta@localhost:5432/meta');

// The user must be able to log in with facebook
module.exports =  {
  user: function(){
    var User = sequelize.define('user', {
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        isUnique: true,
        allowNull: false,
        validate:{
          isEmail: true
        }
      },
      // If the user is admin he should have a place where to select which communities
      // he/she belongs to
      admin: {
        type: Sequelize.BOOLEAN,
      },
      speaker: {
        type: Sequelize.BOOLEAN,
      }
    });
    return User;
  },
  sponsors: function(){
    var Sponsors = sequelize.define('sponsors', {
      name: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      }
    });
    return Sponsors;
  },
  talk_application: function(){
    // This Application must have a user as a Foreign Key
    var TalkApplication = sequelize.define('talk_application', {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      created: {
        type: Sequelize.DATE,
      },
      //Admins of the usergroups work on this area
      approved: {
        type: Sequelize.BOOLEAN,
      },
      proposed_date: {
        type: Sequelize.DATE,
      },
      directions: {
        type: Sequelize.TEXT,
      }
    });
    
    TalkApplication.belongsTo(User);
    return Sponsors;
  },
  talk_evaluation: function(){
    var TalkEvaluation = sequelize.define('talk_evaluation', {
      facebook_attendees: {
        type: Sequelize.INTEGER,
      },
      facebook_interested: {
        type: Sequelize.INTEGER,
      },
      actual_attendees: {
        type: Sequelize.INTEGER,
      },
      donation: {
        type: Sequelize.INTEGER,
      }
    });
    
    TalkEvaluation.belongsTo(User);
    TalkApplication.hasMany(TalkEvaluation);
    return TalkEvaluation;
  },
  user_group: function(){
    var UserGroup = sequelize.define('user_group', {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      facebook_url: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      created: {
        type: Sequelize.DATEONLY,
      }
    });
    
    UserGroup.hasMany(User);
    return UserGroup;
  }
};

module.exports.client = sequelize;
