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
// for Authentication
var jwt = require('jsonwebtoken');
// for better JSON manipulation
var _ = require('underscore');

// all CRUD routes for admin
var adminRoutes = require('./routes/adminRoutes.js');
adminRoutes(app);

var PORT = process.env.PORT || 3000;

app.use(middlewares.logger);
app.use(middlewares.bodyParserJson);

persist.initSync();

/**************************************************************************************************
    Initialise our Databases
**************************************************************************************************/

var initDatabases = function(){
    for (var i = 0; i < arguments.length; i++) {
        if( typeof arguments[i] === "string" && persist.getItemSync(arguments[i]) === undefined )
        {
            var array = [];
            persist.setItemSync(arguments[i], JSON.stringify( array ));
        }
    }
}

initDatabases('Users');

/**************************************************************************************************
    Authentication
**************************************************************************************************/

// Setup a new User
app.post('/api/setupUser', function(req, res, next){
    var user = req.body;
    var Users = JSON.parse(persist.getItemSync('Users'));
    // push to DB
    Users.push(user);
    persist.setItemSync('Users', JSON.stringify(Users));
    console.log(Users);

    res.json({
        "savedUser" : user.name
    });
});

// authenticate user and give token
app.post('/api/authenticate', function(req, res, next){
    var user = req.body;
    var Users = JSON.parse(persist.getItemSync('Users'));

    var match = _.findWhere(Users, {
        "name": user.name
    });

    if(match){
        // check if password matches
        if (match.password !== user.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
            // if user is found and password is right
            // create a token
            var token = jwt.sign(match, persist.getItemSync('passphrase'), {
                expiresIn: 120 // expires in 24 hours
            });
            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }
    } else {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
});

/**************************************************************************************************
    To serve static files
**************************************************************************************************/

//  for static files
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log("server started");
});
