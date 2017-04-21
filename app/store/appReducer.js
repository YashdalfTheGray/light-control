import { defaults } from 'lodash';

const initialState = {
    userName: '',
    userToken: '',
    isUserLoggedIn: false,
    rooms: []
};

function appReducer(state = initialState, action) {
    switch (action.type) {
    case 'ADD_KEY':
        return {
            [action.data]: '',
            ...state
        };
    case 'SET_DEFAULT_VALUE':
        return defaults(action.data, state);
    default:
        return state;
    }
}

export default appReducer;
