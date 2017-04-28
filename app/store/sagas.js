import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { loginUser, getRooms, getOneRoom, getLightStates } from './api';

export function* loginSaga({ data }) {
    try {
        const { token } = yield call(loginUser, data);
        yield put({ type: 'LOGIN_SUCCESSFUL', data: token });
    }
    catch (e) {
        yield put({ type: 'LOGIN_FAILED', data: e.message });
    }
}

export function* getRoomsSaga({ data }) {
    try {
        const rooms = yield call(getRooms, data);
        yield put({ type: 'GET_ROOMS_SUCCESSFUL', data: rooms });
    }
    catch (e) {
        yield put({ type: 'GET_ROOMS_FAILED', data: e.message });
    }
}

export function* getOneRoomSaga({ data }) {
    try {
        const room = yield call(getOneRoom, ...data);
        yield put({ type: 'GET_ONE_ROOM_SUCCESSFUL', data: room });
    }
    catch (e) {
        yield put({ type: 'GET_ONE_ROOM_FAILED', data: e.message });
    }
}

export function* getLights({ data }) {
    try {
        const lightState = yield call(getLightStates, ...data);
        yield put({ type: 'GET_LIGHT_SUCCESSFUL', data: lightState });
    }
    catch (e) {
        yield put({ type: 'GET_LIGHT_FAILED', data: e.message });
    }
}

export default function* rootSaga() {
    yield [
        takeLatest('LOGIN_REQUESTED', loginSaga),
        takeEvery('GET_ROOMS_REQUESTED', getRoomsSaga),
        takeEvery('GET_ONE_ROOM_REQUESTED', getOneRoomSaga),
        takeEvery('GET_LIGHT_REQUESTED', getLights)
    ];
}
