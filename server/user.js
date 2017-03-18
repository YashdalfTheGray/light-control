const { getDb } = require('./db');

class User {
    constructor(name) {
        this.name = name;
        this.created = Date.now();
        this.isVerified = false;
    }
}

async function registerUser(req, res) {
    const db = await getDb(process.env.DB_URL);
    const collection = await db.collection('users');
    const result = await collection.insertOne(new User(req.body.name));
    console.log(result);
    res.sendStatus(200);
}

module.exports = {
    User,
    registerUser
};
