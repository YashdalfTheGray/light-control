import { call, put, takeLatest } from 'redux-saga/effects';

import loginUser from './api';

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
        takeLatest('LOGIN_REQUESTED', loginAsync)
    ];
}
