var persist = require('node-persist');
// for encrytion of database
var jwt = require('jsonwebtoken');
// for better JSON manipulation

module.exports = function(app){
    //test route

    // an example route that requires a token
    app.get('/api/admin/*', function(req, res, next){
        // check header or url parameters or post parameters for token
        var token = req.query.token;

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, persist.getItemSync('passphrase'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else if( decoded.type !== "admin" ) {
                    return res.json({ success: false, message: 'Not an admin' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    app.get('/api/admin/hello', function(req, res, next){
        res.send("yep he's an admin alright");
    });
}
