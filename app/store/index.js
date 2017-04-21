import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import appReducer from './appReducer';
import helloSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const appStore = createStore(appReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(helloSaga);

export default appStore;
