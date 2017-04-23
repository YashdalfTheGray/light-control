import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import appReducer from './appReducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const appStore = createStore(appReducer, applyMiddleware(sagaMiddleware));

const actions = {
    setUser: user => appStore.dispatch({ type: 'SET_USER', data: user }),
    loginUser: () => appStore.dispatch({ type: 'LOGIN_REQUESTED', data: appStore.getState().user }),
    setMessage: msg => appStore.dispatch({ type: 'SET_MESSAGE', data: msg }),
    getRooms: apiKey => appStore.dispatch({ type: 'GET_ROOMS_REQUESTED', data: apiKey })
};

sagaMiddleware.run(rootSaga);

export {
    appStore,
    actions
};
