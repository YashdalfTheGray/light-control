const { assign } = require('lodash');
const { getDb } = require('./db');

async function logEvent(payload) {
    const db = await getDb(process.env.DB_URL);
    const collection = await db.collection('eventlog');
    await collection.insertOne(assign({}, payload, { time: Date.now() }));
}

module.exports = {
    logGetAllRooms: id => logEvent({ type: 'GET_ALL_ROOMS', user: id }),
    logError: e => logEvent({ type: 'SERVER_ERROR', error: JSON.stringify(e) })
};
