const uuid = require('uuid');
const { sign } = require('jsonwebtoken');

const { getDb } = require('./db');

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
            }
            else {
                res.status(500).json({
                    status: 'error',
                    message: 'something went wrong'
                });
            }
        }
        else {
            res.status(400).json({
                status: 'error',
                message: 'user already exists'
            });
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
}

async function loginUser(req, res) {
    try {
        const db = await getDb(process.env.DB_URL);
        const collection = await db.collection('users');
        const [user, ...rest] = await collection.find({ name: req.query.name }).toArray();

        if (rest.length !== 0) {
            res.status(500).json({
                status: 'error',
                message: 'more than one user found'
            });
            return;
        }

        if (!user) {
            res.sendStatus(401);
        }
        else if (user.isAdmin) {
            res.sendStatus(403);
        }
        else {
            res.json({
                token: sign({ usr: user.name, tkn: user.accessToken }, process.env.JWT_SECRET, jwtOptions)
            });
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
}

async function deleteUser(req, res) {
    try {
        const db = await getDb(process.env.DB_URL);
        const collection = await db.collection('users');
        res.json(await collection.remove({ name: req.params.name }));
    }
    catch (e) {
        res.status(500).json(e);
    }
}

module.exports = {
    User,
    registerUser,
    loginUser,
    deleteUser
};
