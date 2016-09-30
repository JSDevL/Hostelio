module.exports = {
    logger: function(req, res, next){
        console.log("Request at " + (new Date()).toString() + ": " + req.method + ' ' + req.originalUrl);
        next();
    }
}
