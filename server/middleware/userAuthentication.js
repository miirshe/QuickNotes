const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../lib/config');
exports.userAuthenticate = (req, res, next) => {
    const token = req.cookies.userToken || req.headers.authorization
    if (!token) return 'un authorized user'
    const decoded = jwt.verify(token, jwt_secret);
    req.userId = decoded.userId;
    next();
}