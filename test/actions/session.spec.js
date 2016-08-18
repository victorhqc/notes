import { assert } from 'chai';
import deepFreeze from 'deep-freeze';
import fetchMock from 'fetch-mock';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { url } from 'api';

import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE
} from '../../src/actions/requests';

const middlewares = [ thunk ];
const mockStore = configureMockStore( middlewares );

export const LOGIN_URL = url + 'people/login';

const cleanResponseTimestamps = ( actions, expectedActions ) => {
    expectedActions[0].requestedAt = actions[0].requestedAt;

    if ( actions[1].receivedAt ) {
        expectedActions[1].receivedAt = actions[1].receivedAt;
    }

    if ( actions[1].failedAt ) {
        expectedActions[1].failedAt = actions[1].failedAt;
    }

    return {
        expectedActions,
        actions
    };
};

describe('Session Actions', function() {
    afterEach(() => fetchMock.reset() );

    const session = {
        id: 'some_token',
        userId: 1
    };

    const response = {
        body: session,
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        sendAsJson: true
    };

    const params = {
        username: 'foobar',
        password: 'password123'
    };

    fetchMock.mock(LOGIN_URL, response, {
        name: 'login-successful',
        method: 'POST',
        matcher: ( url, opts) => {
            if ( !opts || !opts.body ) {
                return false;
            }

            const body = JSON.parse( opts.body );
            return (
                LOGIN_URL === url &&
                body.email === 'foobar' &&
                body.password === 'password123'
            );
        },
        response
    });

    const {
        REMOVE_ACCESS,
        removeAccess,
        fetchAccess,
        fetchAccessIfNeeded
    } = require('../../src/actions/session');

    it ('Should fetchAccess, AKA, login', ( done ) => {
        const resultActions = [{
            type: REQUEST,
            name: 'session',
            requestedAt: Date.now()
        }, {
            type: RECEIVE,
            name: 'session',
            receivedAt: Date.now(),
            result: session
        }];

        const { dispatch, getActions } = mockStore({});

        dispatch( fetchAccess( params.username, params.password ) )
        .then(() => {
            const { actions, expectedActions } = cleanResponseTimestamps( getActions(), resultActions );
            assert.deepEqual( actions, expectedActions );
            done();
        })
        .catch( done );
    });

    it ('Should handle Incorrect Login', ( done ) => {
        const resultActions = [{
            type: REQUEST,
            name: 'session',
            requestedAt: Date.now()
        }, {
            type: FAIL_RECEIVE,
            name: 'session',
            failedAt: Date.now()
        }];

        const response = {
            body: {
                foo: 'bar'
            },
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            },
            sendAsJson: true
        };

        fetchMock.mock(LOGIN_URL, response, {
            name: 'login-fail',
            method: 'POST',
            matcher: ( url, opts) => {
                if ( !opts || !opts.body ) {
                    return false;
                }

                const body = JSON.parse( opts.body );
                return (
                    LOGIN_URL === url &&
                    body.email === 'foobar' &&
                    body.password === 'bad_password'
                );
            },
            response
        });

        const { dispatch, getActions } = mockStore({});

        dispatch( fetchAccess( params.username, 'bad_password' ) )
        .then(() => {
            let { actions, expectedActions } = cleanResponseTimestamps( getActions(), resultActions );
            const error = actions[1].error;
            delete actions[1].error;
            assert.deepEqual( actions, expectedActions );
            done();
        })
        .catch( done );
    });

    it ('Should session if needed', ( done ) => {

        const resultActions = [{
            type: REQUEST,
            name: 'session',
            requestedAt: Date.now()
        }, {
            type: RECEIVE,
            name: 'session',
            receivedAt: Date.now(),
            result: session
        }];

        const { dispatch, getActions } = mockStore({
            session: null
        });

        dispatch( fetchAccessIfNeeded( params.username, params.password ) )
        .then(() => {
            const { actions, expectedActions } = cleanResponseTimestamps( getActions(), resultActions );
            assert.deepEqual( actions, expectedActions );
            done();
        })
        .catch( done );
    });

    it ('Should not get session if already fetching', ( done ) => {

        const resultActions = [];

        const { dispatch, getActions } = mockStore({
            session: {
                isFetching: true
            }
        });

        dispatch( fetchAccessIfNeeded( params.username, params.password ) )
        .then(() => {
            assert.deepEqual( getActions(), resultActions );
            done();
        })
        .catch( done );
    });
});
