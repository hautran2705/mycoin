const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    const accessToken = req.headers['x-access-token'];
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, 'Ae5jFLQ2BF');
            req.accessTokenPayload = decoded;
            req.accessToken = accessToken;
            next();
        } catch (error) {
            return res.json({
                authenticated: false
            });
        }
    } else {
        return res.json({
            authenticated: false
        });
    }
}