const krouter = require('koa-router');
const router = krouter();

router.get('/donations', function* (){
  yield this.render('donations', {});
});

module.exports = router;
