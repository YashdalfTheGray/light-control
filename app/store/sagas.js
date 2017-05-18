import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
    loginUser,
    registerUser,
    deleteAccount,
    getRooms,
    getOneRoom,
    setOneRoom,
    getLightStates,
    setOneLightState
} from './api';

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

export function* deleteSaga({ data }) {
    try {
        yield call(deleteAccount, data);
        yield put({ type: 'DELETE_ACCOUNT_SUCCESSFUL' });
    }
    catch (e) {
        yield put({ type: 'DELETE_ACCOUNT_FAILED', data: e.message });
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
        const lightStates = yield call(getLightStates, data[0], ...room.lightIds);
        yield put({ type: 'GET_LIGHTS_SUCCESSFUL', data: lightStates });
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

export function* setLightState({ data }) {
    try {
        const lightState = yield call(setOneLightState, ...data);
        yield put({ type: 'SET_LIGHT_SUCCESSFUL', data: lightState });
    }
    catch (e) {
        yield put({ type: 'SET_LIGHT_FAILED', data: e.message });
    }
}

export default function* rootSaga() {
    yield [
        takeLatest('LOGIN_REQUESTED', loginSaga),
        takeLatest('REGISTRATION_REQUESTED', registerSaga),
        takeLatest('DELETE_ACCOUNT_REQUESTED', deleteSaga),
        takeEvery('GET_ROOMS_REQUESTED', getRoomsSaga),
        takeEvery('GET_ONE_ROOM_REQUESTED', getOneRoomSaga),
        takeEvery('SET_ONE_ROOM_REQUESTED', setOneRoomSaga),
        takeEvery('GET_LIGHTS_REQUESTED', getLights),
        takeEvery('SET_LIGHT_REQUESTED', setLightState)
    ];
}
