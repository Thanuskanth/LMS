const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(400).json('Autherization denail');

    try {
        const decode = jwt.verify(token, process.env.jwt_secred);
        req.user = decode;
        next();
    }
    catch (e) {
        return res.status(400).json("invalid token")
    }
}
module.exports=auth;