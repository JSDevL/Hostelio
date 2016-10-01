var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var middlewares = require("./middlewares.js");

app.use(middlewares.logger);

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log("server started");
});
