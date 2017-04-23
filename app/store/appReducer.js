import { assign } from 'lodash';

const initialState = {
    user: '',
    userToken: '',
    snackbarMessage: '',
    rooms: []
};

function appReducer(state = initialState, { type, data }) {
    const assignState = changes => assign({}, state, changes);

    switch (type) {
    case 'SET_USER':
        return assignState({ user: data });
    case 'LOGIN_SUCCESSFUL':
        return assignState({ userToken: data, snackbarMessage: '' });
    case 'GET_ROOMS_SUCCESSFUL':
        return assignState({ rooms: data, snackbarMessage: '' });
    case 'LOGIN_FAILED':
    case 'GET_ROOMS_FAILED':
        return assignState({ snackbarMessage: data });
    case 'SET_MESSAGE':
        return assignState({ snackbarMessage: '' });
    default:
        return state;
    }
}

export default appReducer;
