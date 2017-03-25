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
        const db = await getDb(process.env.DB_URL);
        const collection = await db.collection('users');
        const [user] = await collection.find({ accessToken: token }).toArray();

        if (!user) {
            res.status(403).json({
                status: 'error',
                message: 'user not authorized'
            });
        }
        else {
            res.locals.user = user;
            next();
        }
    }
}

module.exports = {
    authenticate
};
