module.exports = createInMemoryEventSource;

function createInMemoryEventSource(options) {
  const items = options.items;
  const factory = options.factory;

  return {
    *getAll() {
      return items.map(factory);
    }
  };
}
