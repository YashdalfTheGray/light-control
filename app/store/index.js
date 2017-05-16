import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import appReducer from './appReducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const appStore = createStore(appReducer, applyMiddleware(sagaMiddleware));

const actions = {
    setUser: user => appStore.dispatch({ type: 'SET_USER', data: user.toLowerCase() }),
    loginUser: () => appStore.dispatch({ type: 'LOGIN_REQUESTED', data: appStore.getState().user }),
    registerUser: () => appStore.dispatch({ type: 'REGISTRATION_REQUESTED', data: appStore.getState().user }),
    logoutUser: () => appStore.dispatch({ type: 'LOGOUT_USER' }),
    setMessage: msg => appStore.dispatch({ type: 'SET_MESSAGE', data: msg }),
    clearMessage: () => appStore.dispatch({ type: 'SET_MESSAGE', data: '' }),
    getRooms: apiKey => appStore.dispatch({ type: 'GET_ROOMS_REQUESTED', data: apiKey }),
    getOneRoom: (...args) => appStore.dispatch({ type: 'GET_ONE_ROOM_REQUESTED', data: args }),
    setOneRoom: (...args) => appStore.dispatch({ type: 'SET_ONE_ROOM_REQUESTED', data: args }),
    getLightStates: (...args) => appStore.dispatch({ type: 'GET_LIGHTS_REQUESTED', data: args }),
    setLightState: (...args) => appStore.dispatch({ type: 'SET_LIGHT_REQUESTED', data: args })
};

sagaMiddleware.run(rootSaga);

export {
    appStore,
    actions
};
