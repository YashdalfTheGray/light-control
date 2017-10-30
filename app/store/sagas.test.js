import * as sagas from './sagas';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import * as api from './api';

describe('sagas', () => {
    describe('loginSaga', () => {

        it('loginSaga should follow login flow', () => {
            return expectSaga(sagas.loginSaga, { data: {} })
                .provide([
                    [matchers.call.fn(api.loginUser), { token: 'abc' }]    
                ])
                .call(api.loginUser, {})
                .put({ type:'LOGIN_SUCCESSFUL', data: 'abc' })
                .run();
        });

        it('loginSaga should put LOGIN_FAILED if it throws', () => {
            return expectSaga(sagas.loginSaga, { data: {} })
                .provide([
                    [matchers.call.fn(api.loginUser), throwError((new Error('meh.')))]    
                ])
                .call(api.loginUser, {})
                .put({ type:'LOGIN_FAILED', data: 'meh.' })
                .run();
        });

        it('registerSaga should put REGISTRATION_FAILED if it throws', () => {
            return expectSaga(sagas.registerSaga, { data: {} })
                .provide([
                    [matchers.call.fn(api.registerUser), throwError((new Error('meh.')))]    
                ])
                .call(api.registerUser, {})
                .put({ type:'REGISTRATION_FAILED', data: 'meh.' })
                .run();
        });

        it('deleteSaga should put DELETE_ACCOUNT_FAILED if it throws', () => {
            return expectSaga(sagas.deleteSaga, { data: [1] })
                .provide([
                    [matchers.call.fn(api.deleteAccount), throwError((new Error('meh.')))]    
                ])
                .put({ type:'DELETE_ACCOUNT_FAILED', data: 'meh.' })
                .run();
        });

    });
});