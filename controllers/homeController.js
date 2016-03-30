function homeController() {
  return {
    renderHome: function* () {
      yield this.render('index', {});
    },
    renderAboutUs: function* () {
      yield this.render('about_us', {});
    },
    renderContact: function* () {
      yield this.render('contact', {});
    },
    pageNotFound: function* () {
      if( this.status === 404){
        yield this.render('404');
      }
    }
  };
}

module.exports = homeController;
