const { differenceWith } = require('lodash');

const { getDb } = require('./db');

module.exports = async path => {
    const admins = require(path);
    const db = await getDb(process.env.DB_URL);
    const collection = await db.collection('users');

    const adminsFromDb = await collection.find({ isAdmin: true }).project({ _id: 0 }).toArray();
    const newAdmins = differenceWith(admins, adminsFromDb, (a, b) => a.name === b.name);

    if (newAdmins.length > 0) {
        return await collection.insertMany(newAdmins);
    }
    
    return 'finished';
}
