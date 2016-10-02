// for our express server
var express = require("express");
var app = express();
// for all the middlewares we'll use
/*  logger
    bodyParser  */
var middlewares = require("./middlewares.js");
// for the persistence of our node objects
var persist = require('node-persist');
// for encrytion of database
var crypto = require('crypto-js');

var PORT = process.env.PORT || 3000;

app.use(middlewares.logger);
app.use(middlewares.bodyParserJson);

persist.initSync();

var initObject = function(){
    this.index = -1;
};

var initDatabases = function(){
    for (var i = 0; i < arguments.length; i++) {
        if( typeof arguments[i] === "string" && persist.getItemSync(arguments[i]) === undefined )
        {
            persist.setItemSync(arguments[i], JSON.stringify(new initObject()));
        }
    }
}

//initDatabases('Accounts', 'Announcements');


























// /*******************************************
//
// GET methods
//
// *******************************************/
//
// app.get("/api", function(req, res){
//     res.json(db);
// });
//
// /*******************************************
//
// POST methods
//
// *******************************************/
//
// app.post("/api", function(req, res){
//     console.log(req.body);
//     res.json( req.body );
// });
//
// //  for static files
// app.use(express.static(__dirname + '/public'));
//
// app.listen(PORT, function(){
//     console.log("server started");
// });
