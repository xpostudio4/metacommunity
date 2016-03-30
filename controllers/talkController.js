const parse = require('co-body');

function talkController(db) {
  return {
    renderTalkSubmissionForm: function* () {
      const userGroups = yield db.usergroups.find();
      const context = {usergroups: userGroups};

      yield this.render('submit_talk', context);
    },
    submitTalk: function* () {
      // TODO: Only allow a set of specific fields.
      const rawBody = yield parse(this);
      const belongsToUserGroup = rawBody.usergroups && rawBody.usergroups.length;

      // TODO: Render an error message if talk doesn't belong to an user group.
      if (belongsToUserGroup) {
        yield db.talks.create(rawBody);
      }

      return this.redirect('/speakers');
    }
  };
}

module.exports = talkController;
