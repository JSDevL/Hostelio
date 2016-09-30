var express = require("express");
var app = express();

var middlewares = {
    logger: function(req, res, next){
        console.log("Request at " + (new Date()).toString() + ": " + req.method + ' ' + req.originalUrl);
        next();
    }
}

app.use(middlewares.logger);

app.use(express.static(__dirname + '/public'));

app.listen(3000);
