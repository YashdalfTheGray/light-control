const { assign } = require('lodash');
const { getDb } = require('./db');

async function logEvent(payload) {
  const db = await getDb(process.env.DB_URL);
  const collection = await db.collection('eventlog');
  await collection.insertOne(assign({}, payload, { time: Date.now() }));
}

/* eslint-disable object-shorthand */
module.exports = {
  logUserRegistration: (user, outcome) =>
    logEvent({ type: 'USER_REGISTRATION', user, outcome }),
  logUserLogin: (user, outcome) =>
    logEvent({ type: 'USER_LOGIN', user, outcome }),
  logUserDeleted: user => logEvent({ type: 'USER_DELETED', user }),
  logGetAllRooms: user => logEvent({ type: 'GET_ALL_ROOMS', user }),
  logGetRoomLights: (user, room) =>
    logEvent({ type: 'GET_ROOM_LIGHTS', user, room }),
  logSetRoomLights: (user, room, state) =>
    logEvent({ type: 'SET_ROOM_LIGHTS', user, room, state }),
  logGetOneLight: (user, light) =>
    logEvent({ type: 'GET_ONE_LIGHT', user, light }),
  logSetOneLight: (user, light, state) =>
    logEvent({ type: 'SET_ONE_LIGHT', user, light, state }),
  logError: e => logEvent({ type: 'SERVER_ERROR', error: JSON.stringify(e) })
};
/* eslint-enable object-shorthand */
