const krouter = require('koa-router');
const router = krouter();

router.get('/events', function* (){
  yield this.render('events', {});
});


module.exports = router;
