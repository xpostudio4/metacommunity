module.exports = {
  donation: require('./donation').routes(),
  event: require('./event').routes(),
  home: require('./home').routes(),
  talk: require('./talk').routes(),
  user: require('./user').routes(),
  sponsor: require('./sponsor').routes()
};
