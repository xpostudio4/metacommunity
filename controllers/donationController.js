function donationController() {
  return {
    renderDonations: function* (){
      yield this.render('donations', {});
    }
  };
}

module.exports = donationController;
