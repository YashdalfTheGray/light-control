import { defaults } from 'lodash';

const initialState = {
    userName: '',
    userToken: '',
    loggingIn: false,
    showSnackbar: false,
    snackbarMessage: '',
    rooms: []
};

function appReducer(state = initialState, { type, data }) {
    switch (type) {
    case 'LOGIN_REQUESTED':
        return defaults({ loggingIn: true }, state);
    case 'LOGIN_SUCCESSFUL':
        return defaults({ loggingIn: false, userToken: data }, state);
    case 'LOGIN_FAILED':
        return defaults({ loggingIn: false, showSnackbar: true, snackbarMessage: data }, state);
    case 'TEST_ACTION':
        return defaults({ testVal: data }, state);
    default:
        return state;
    }
}

export default appReducer;
