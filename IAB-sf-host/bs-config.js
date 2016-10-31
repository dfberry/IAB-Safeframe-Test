module.exports = {
  "logLevel": "debug",
  "port": 8010,
  "files": ["./website/**/*.{html,htm,css,js}"],
  "server": { "baseDir": "./website", "directory": true },
  "ui": {"port": 8011}
};