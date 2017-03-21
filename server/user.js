const uuid = require('uuid');

const { getDb } = require('./db');

class User {
    constructor(name) {
        this.name = name;
        this.created = Date.now();
        this.isVerified = false;
        this.accessToken = uuid();
    }
}

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
            res.json({ accessToken: user.accessToken }); // TODO: add JWT here
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
}

async function getUsers(req, res) {
    try {
        const db = await getDb(process.env.DB_URL);
        const collection = await db.collection('users');
        const users = await collection.find().toArray();

        res.json(users.map(({ _id, name, created }) => ({ _id, name, created })));
    }
    catch (e) {
        res.status(500).json(e);
    }
}

module.exports = {
    User,
    registerUser,
    loginUser,
    getUsers
};
