const uuid = require('uuid');
const { sign } = require('jsonwebtoken');

const { getDb } = require('./db');
const { logError, logUserRegistration, logUserLogin, logUserDeleted } = require('./events');

class User {
    constructor(name) {
        this.name = name;
        this.created = Date.now();
        this.isVerified = false;
        this.accessToken = uuid();
    }
}

const jwtOptions = {
    issuer: process.env.JWT_ISSUER,
    expiresIn: process.env.JWT_TTL
};

async function registerUser(req, res) {
    try {
        const db = await getDb(process.env.DB_URL);
        const collection = await db.collection('users');
        const users = await collection.find({ name: req.body.name }).toArray();

        if (users.length === 0) {
            const { result } = await collection.insertOne(new User(req.body.name));
            if (result.ok === 1) {
                res.sendStatus(201);
                logUserRegistration(req.body.name, 'successful');
            }
            else {
                const error = {
                    status: 'error',
                    message: 'something went wrong'
                };
                res.status(500).json(error);
                logError(error);
            }
        }
        else {
            res.sendStatus(400);
            logUserRegistration(req.body.name, 'already_registered');
        }
    }
    catch (e) {
        res.status(500).json(e);
        logError(e);
    }
}

async function loginUser(req, res) {
    try {
        const db = await getDb(process.env.DB_URL);
        const collection = await db.collection('users');
        const [user, ...rest] = await collection.find({
            name: req.query.name,
            isVerified: true
        }).toArray();

        if (rest.length !== 0) {
            const error = {
                status: 'error',
                message: 'more than one user found'
            };
            res.status(500).json(error);
            logError(error);
            return;
        }

        if (!user) {
            res.sendStatus(403);
            logUserLogin(req.query.name, 'unauthorized');
        }
        else {
            res.json({
                token: sign({ usr: user.name, tkn: user.accessToken }, process.env.JWT_SECRET, jwtOptions)
            });
            logUserLogin(req.query.name, 'successful');
        }
    }
    catch (e) {
        res.status(500).json(e);
        logError(e);
    }
}

async function deleteUser(req, res) {
    try {
        const db = await getDb(process.env.DB_URL);
        const collection = await db.collection('users');
        res.json(await collection.remove({ name: req.params.name }));
        logUserDeleted(req.params.name);
    }
    catch (e) {
        res.status(500).json(e);
        logError(e);
    }
}

module.exports = {
    registerUser,
    loginUser,
    deleteUser
};
