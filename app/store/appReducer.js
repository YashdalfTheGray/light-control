import { assign } from 'lodash';

const initialState = {
    user: '',
    userToken: '',
    loggingIn: false,
    snackbarMessage: '',
    rooms: []
};

function appReducer(state = initialState, { type, data }) {
    const assignState = changes => assign({}, state, changes);

    switch (type) {
    case 'SET_USER':
        return assignState({ user: data });
    case 'LOGIN_REQUESTED':
        return assignState({ loggingIn: true });
    case 'LOGIN_SUCCESSFUL':
        return assignState({ loggingIn: false, userToken: data, snackbarMessage: '' });
    case 'LOGIN_FAILED':
        return assignState({ loggingIn: false, showSnackbar: true, snackbarMessage: data });
    default:
        return state;
    }
}

export default appReducer;
