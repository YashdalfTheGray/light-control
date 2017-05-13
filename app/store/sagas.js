import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { loginUser, registerUser, getRooms, getOneRoom, setOneRoom, getLightStates } from './api';

export function* loginSaga({ data }) {
    try {
        const { token } = yield call(loginUser, data);
        yield put({ type: 'LOGIN_SUCCESSFUL', data: token });
    }
    catch (e) {
        yield put({ type: 'LOGIN_FAILED', data: e.message });
    }
}

export function* registerSaga({ data }) {
    try {
        yield call(registerUser, data);
        yield put({ type: 'REGISTRATION_SUCCESSFUL', data: 'Registration successful' });
    }
    catch (e) {
        yield put({ type: 'REGISTRATION_FAILED', data: e.message });
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

export function* setOneRoomSaga({ data }) {
    try {
        const room = yield call(setOneRoom, ...data);
        yield put({ type: 'SET_ONE_ROOM_SUCCESSFUL', data: room });
    }
    catch (e) {
        yield put({ type: 'SET_ONE_ROOM_FAILED', data: e.message });
    }
}

export function* getLights({ data }) {
    try {
        const lightState = yield call(getLightStates, ...data);
        yield put({ type: 'GET_LIGHTS_SUCCESSFUL', data: lightState });
    }
    catch (e) {
        yield put({ type: 'GET_LIGHTS_FAILED', data: e.message });
    }
}

export default function* rootSaga() {
    yield [
        takeLatest('LOGIN_REQUESTED', loginSaga),
        takeLatest('REGISTRATION_REQUESTED', registerSaga),
        takeEvery('GET_ROOMS_REQUESTED', getRoomsSaga),
        takeEvery('GET_ONE_ROOM_REQUESTED', getOneRoomSaga),
        takeEvery('SET_ONE_ROOM_REQUESTED', setOneRoomSaga),
        takeEvery('GET_LIGHTS_REQUESTED', getLights)
    ];
}
