function eventController() {
  return {
    renderEvents: function* (){
      yield this.render('events', {});
    }
  };
}

module.exports = eventController;
