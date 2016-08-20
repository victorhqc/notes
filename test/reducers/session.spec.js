import { assert } from 'chai';
import deepFreeze from 'deep-freeze';
import moment from 'moment';

import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE,
    ACCESS,
    REMOVE_ACCESS
} from '../../src/actions';

import {
    request,
    receive,
    failReceive
} from '../../src/reducers/request';

import {
    authorized,
    session
} from '../../src/reducers/session';

describe('Authorized Reducer', function() {
    it ('Should return the initial state', () => {
        const response = authorized( undefined, {} );
        assert.isTrue( response );
    });

    it ('Should handle REQUEST', () => {
        const response = authorized( false, {
            type: REQUEST
        });

        assert.isTrue( response );
    });

    it ('Should handle RECEIVE', () => {
        const response = authorized( false, {
            type: RECEIVE
        });

        assert.isTrue( response );
    });

    it ('Should handle FAIL_RECEIVE', () => {
        const responseWithNoError = authorized( false, {
            type: FAIL_RECEIVE
        });
        assert.isTrue( responseWithNoError );

        const responseWithNon401ErrorStatus = authorized( true, {
            type: FAIL_RECEIVE,
            error: {
                response: {
                    status: 500
                }
            }
        });
        assert.isTrue( responseWithNon401ErrorStatus );

        const responseWith401ErrorStatus = authorized( true, {
            type: FAIL_RECEIVE,
            error: {
                response: {
                    status: 401
                }
            }
        });
        assert.isFalse( responseWith401ErrorStatus );
    });
});

describe('Session Reducer', function() {
    it ('Should return the initial state', () => {
        const response = session( undefined, {} );
        assert.deepEqual( response, {} );
    });

    it ('Should handle REQUEST', () => {
        const currentState = {};
        deepFreeze( currentState );

        const requestedAt = Date.now();
        const expectedState = request({}, {
            type: REQUEST,
            requestedAt
        });

        const response = session( currentState, {
            type: REQUEST,
            name: 'session',
            requestedAt
        });
        assert.deepEqual( response, expectedState );

        const responseWithWrongName = session( currentState, {
            type: REQUEST,
            name: 'non-session',
            requestedAt
        });
        assert.deepEqual( responseWithWrongName, currentState );
    });

    it ('Should handle RECEIVE', () => {
        const currentState = {
            requestedAt: Date.now()
        };
        deepFreeze( currentState );

        const result = {
            id: 'some_token',
            userId: 1
        };

        const receivedAt = Date.now();
        const expectedState = receive(currentState, {
            type: RECEIVE,
            receivedAt,
            result
        });

        const response = session( currentState, {
            type: RECEIVE,
            name: 'session',
            receivedAt,
            result
        });
        assert.deepEqual( response, expectedState );

        const responseWithWrongName = session( currentState, {
            type: RECEIVE,
            name: 'non-session',
            receivedAt,
            result
        });
        assert.deepEqual( responseWithWrongName, currentState );
    });

    it ('Should handle FAIL_RECEIVE', () => {
        const currentState = {};
        deepFreeze( currentState );

        const failedAt = Date.now();
        const error = { message: 'some error' };
        const expectedState = failReceive({}, {
            type: FAIL_RECEIVE,
            failedAt,
            error
        });

        const response = session( currentState, {
            type: FAIL_RECEIVE,
            name: 'session',
            failedAt,
            error
        });
        assert.deepEqual( response, expectedState );

        const responseWithWrongName = session( currentState, {
            type: FAIL_RECEIVE,
            name: 'non-session',
            failedAt,
            error
        });
        assert.deepEqual( responseWithWrongName, currentState );
    });
});
