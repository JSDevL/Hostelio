var express = require("express");
var app = express();
var middlewares = require("./middlewares.js");
var PORT = process.env.PORT || 3000;

var db = [
    {
        id: 1,
        description : "Hi"
    },
    {
        id: 2,
        description : "Hello"
    }
]

app.use(middlewares.logger);
app.use(middlewares.bodyParserJson);
app.use(express.static(__dirname + '/public'));

/*******************************************

GET methods

*******************************************/

app.get("/api", function(req, res){
    res.json(db);
});

app.get("/api/:id", function(req, res){

    db.forEach(function(item){
        if( parseInt(req.params.id) === item.id )
        {
            res.json(item);
        }
    });

    res.status(404).send();
});

/*******************************************

POST methods

*******************************************/

app.post("/api", function(req, res){
    console.log(req.body);
    res.json( req.body );
});

app.listen(PORT, function(){
    console.log("server started");
});
