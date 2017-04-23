import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import appReducer from './appReducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const appStore = createStore(appReducer, applyMiddleware(sagaMiddleware));

const actions = {
    setUser: user => appStore.dispatch({ type: 'SET_USER', data: user }),
    loginUser: user => appStore.dispatch({ type: 'LOGIN_REQUESTED', data: user }),
    setMessage: msg => appStore.dispatch({ type: 'SET_MESSAGE', data: msg })
};

sagaMiddleware.run(rootSaga);

export default {
    appStore,
    actions
};
