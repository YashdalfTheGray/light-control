import { assign } from 'lodash';

const initialState = {
    user: '',
    userToken: '',
    snackbarMessage: '',
    rooms: [],
    lights: {}
};

function appReducer(state = initialState, { type, data }) {
    const assignState = changes => assign({}, state, { snackbarMessage: '' }, changes);
    const mergeAndReplaceRoom = room => [
        ...state.rooms.filter(r => r.id !== room.id),
        room
    ].sort((a, b) => a.id - b.id);

    switch (type) {
    case 'SET_USER':
        return assignState({ user: data });
    case 'LOGIN_SUCCESSFUL':
        return assignState({ userToken: data });
    case 'GET_ROOMS_SUCCESSFUL':
        return assignState({ rooms: data });
    case 'GET_ONE_ROOM_SUCCESSFUL':
        return assignState({ rooms: mergeAndReplaceRoom(data) });
    case 'GET_LIGHTS_SUCCESSFUL':
        return assignState({ lights: assign({}, state.lights, data) });
    case 'LOGOUT_USER':
        return initialState;
    case 'REGISTRATION_SUCCESSFUL':
    case 'LOGIN_FAILED':
    case 'REGISTRATION_FAILED':
    case 'GET_ROOMS_FAILED':
    case 'GET_LIGHTS_FAILED':
    case 'SET_MESSAGE':
        return assignState({ snackbarMessage: data });
    default:
        return state;
    }
}

export default appReducer;
