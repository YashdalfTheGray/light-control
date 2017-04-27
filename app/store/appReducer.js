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

    switch (type) {
    case 'SET_USER':
        return assignState({ user: data });
    case 'LOGIN_SUCCESSFUL':
        return assignState({ userToken: data });
    case 'GET_ROOMS_SUCCESSFUL':
        return assignState({ rooms: data });
    case 'GET_LIGHT_SUCCESSFUL':
        return assignState({ lights: assign({}, state.lights, data) });
    case 'LOGIN_FAILED':
    case 'GET_ROOMS_FAILED':
    case 'GET_LIGHT_FAILED':
    case 'SET_MESSAGE':
        return assignState({ snackbarMessage: data });
    default:
        return state;
    }
}

export default appReducer;
