const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../lib/config');
exports.userAuthenticate = (req, res, next) => {
    const token = req.headers.authorization  || req.cookies.userToken
    if (!token) {
        return res.json({
            status :false,
            message : 'un authorized user'
        })
    }
    const decoded = jwt.verify(token, jwt_secret);
    req.userId = decoded.userId;
    next();
}