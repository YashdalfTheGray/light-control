import { assign } from 'lodash';

const initialState = {
    user: '',
    userToken: '',
    snackbarMessage: '',
    rooms: []
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
    case 'LOGIN_FAILED':
    case 'GET_ROOMS_FAILED':
    case 'SET_MESSAGE':
        return assignState({ snackbarMessage: data });
    default:
        return state;
    }
}

export default appReducer;
