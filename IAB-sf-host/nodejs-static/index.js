"use strict";

//module dependencies.
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var serveIndex = require('serve-index');

// location of config settings
var config = require('./config.json');

if (!config || !config.port) {
  console.log("config file error");
  return;
}

app.use(function (req, res, next) {
  console.log(Date() + " "  + req.baseUrl + " " + req.url + " " + req.method);
  next();
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');   
    next();
});

// root request 
if(config.default){
  var pathToFile = path.join(__dirname + config.default);
  console.log(pathToFile);

  fs.stat(pathToFile, function(err, stat){
    if (err == null){
      app.get('/', function(req, res) {
        res.sendFile(pathToFile);
      });
    }
  });
}


// location of static files
app.use(express.static('./public'));
app.use('./public', serveIndex('public', {'icons':true}));

// remove expressjs from response
app.disable('x-powered-by');

// begin listening
app.listen(config.port, function () {
  console.log('Static sesrver listening on port ' + config.port);
});
