const fileSystem = require('co-fs');

module.exports = createFileSystemEventSource;

function createFileSystemEventSource(options) {
  const path = options.path;
  const factory = options.factory;

  return {
    *getAll() {
      const fileContent = yield fileSystem.readFile(path, { encoding: 'utf-8' });
      const rawJson = JSON.parse(fileContent);

      return rawJson.map(factory);
    }
  };
}
