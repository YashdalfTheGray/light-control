const { assign } = require('lodash');
const { getDb } = require('./db');

async function logEvent(payload) {
    const db = await getDb(process.env.DB_URL);
    const collection = await db.collection('eventlog');
    await collection.insertOne(assign({}, payload, { time: Date.now() }));
}

/* eslint-disable object-shorthand */
module.exports = {
    logGetAllRooms: user => logEvent({ type: 'GET_ALL_ROOMS', user }),
    logGetRoomLights: (user, room) => logEvent({ type: 'GET_ROOM_LIGHTS', user, room }),
    logError: e => logEvent({ type: 'SERVER_ERROR', error: JSON.stringify(e) })
};
/* eslint-enable object-shorthand */
