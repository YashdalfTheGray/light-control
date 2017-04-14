const { verify, TokenExpiredError } = require('jsonwebtoken');

const { getDb } = require('./db');

async function authenticate(req, res, next) {
    if (!req.get('Authorization')) {
        res.status(401).json({
            status: 'error',
            message: 'no authorization header found'
        });
        return;
    }

    const [type, token] = req.get('Authorization').split(' ');

    if (type !== 'Bearer') {
        res.status(403).json({
            status: 'error',
            message: 'incorrect authorization type'
        });
    }
    else if (!token) {
        res.status(403).json({
            status: 'error',
            message: 'problematic authentication token'
        });
    }
    else {
        const userNotAuthenticatedError = {
            status: 'error',
            message: 'user not authenticated'
        };

        try {
            const { tkn, usr } = verify(token, process.env.JWT_SECRET);
            const db = await getDb(process.env.DB_URL);
            const collection = await db.collection('users');
            const [user] = await collection.find({ accessToken: tkn }).toArray();

            if (!user) {
                res.status(403).json(userNotAuthenticatedError);
            }
            else if (user.name !== usr) {
                res.status(403).json(userNotAuthenticatedError);
            }
            else if (!user.isVerified) {
                res.status(403).json({
                    status: 'error',
                    message: 'user is not verified'
                });
            }
            else {
                res.locals.user = user;
                next();
            }
        }
        catch (e) {
            if (e instanceof TokenExpiredError) {
                res.status(403).json(e);
            }
            else {
                res.status(500).json(e);
            }
        }
    }
}

module.exports = {
    authenticate
};
