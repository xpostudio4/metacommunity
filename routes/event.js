const krouter = require('koa-router');
const router = krouter();
const path = require('path');
const moment = require('moment');
const config = require('../config');
const createEvent = require('../domain/event');
const createFileSystemEventSource = require('../services/file-system-event-source');

router.get('/events', function* () {
  // TODO: Inject source dependency.
  const source = createFileSystemEventSource({
    path: path.join(config.TEMPORAL_DIR, 'events.json'),
    factory: createEvent
  });

  const events = yield source.getAll();
  const isPending = (e) => !e.isDue;
  const filteredEvents = events.filter(isPending);

  const formatDate = (format, date) => {
    return moment(date).format(format);
  };

  yield this.render('events', {events: filteredEvents, formatDate});
});



module.exports = router;
