import { defaults } from 'lodash';

const initialState = {
    foo: 1,
    bar: true,
    baz: 'stuff'
};

function appReducer(state = initialState, action) {
    switch (action.type) {
    case 'SET_FOO':
        return defaults({ foo: action.data }, state);
    case 'SET_BAR':
        return defaults({ bar: action.data }, state);
    case 'SET_BAZ':
        return defaults({ baz: action.data }, state);
    default:
        return state;
    }
}

export default appReducer;
