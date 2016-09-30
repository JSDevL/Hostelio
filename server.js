var express = require("express");
var app = express();
var middlewares = require("./middlewares.js");

app.use(middlewares.logger);

app.use(express.static(__dirname + '/public'));

app.listen(3000, function(){
    console.log("server started");
});
