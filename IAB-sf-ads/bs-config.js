module.exports = {
  "logLevel": "debug",
  "port": 8020,
  "files": ["./**/*.{html,htm,css,js}"],
  "server": { "baseDir": "./", "directory": true },
  "ui": {"port": 8021},
  middleware: [
    function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, CONNECT');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
        next();
    }
  ]

      
};