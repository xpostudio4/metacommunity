const krouter = require('koa-router');
const router = krouter();
const db = require('../db');

router.get('/sponsors', function* renderSponsors() {
  const sponsors = yield db.sponsors.find();
  const context = { sponsors:sponsors };
  yield this.render('sponsors', context);
});

module.exports = router;
