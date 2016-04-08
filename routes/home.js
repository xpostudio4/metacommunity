const krouter = require('koa-router');
const router = krouter();

router.get('/', function* () {
  yield this.render('index', {});
});
router.get('/about', function* () {
  yield this.render('about_us', {});
});
router.get('/contact', function* () {
  yield this.render('contact', {});
});

module.exports = router;
