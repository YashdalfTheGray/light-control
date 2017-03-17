const { MongoClient } = require('mongodb');
const { find, remove } = require('lodash');

let dbs = [];

async function getDb(url) {
    const db = find(dbs, v => v.url === url);
    if (!db) {
        const dbListing = { url: url };
        dbListing.ref = await MongoClient.connect(url);
        dbs.push(dbListing);
        return dbListing;
    }
    return db.ref;
}

async function closeDb(url) {
    return await Promise.all(remove(dbs, v => v.url === url).map(db => db.ref.close()));
}

module.exports = {
    getDb,
    closeDb
};
