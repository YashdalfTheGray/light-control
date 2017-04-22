import { delay } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import loginUser from './api';

export function* helloSaga({ data }) {
    yield delay(5000);
    yield put({ type: 'TEST_ACTION', data: data });
}

export function* loginAsync({ data }) {
    try {
        const { token } = yield call(loginUser, data);
        yield put({ type: 'LOGIN_SUCCESSFUL', data: token });
    }
    catch (e) {
        yield put({ type: 'LOGIN_FAILED', data: e.message });
    }
}

export default function* rootSaga() {
    yield [
        takeEvery('SAY_HELLO', helloSaga),
        takeLatest('LOGIN_REQUESTED', loginAsync)
    ];
}
