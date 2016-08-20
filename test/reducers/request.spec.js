import { assert } from 'chai';
import deepFreeze from 'deep-freeze';
import moment from 'moment';

import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE
} from '../../src/actions';

import {
    isFetching,
    request,
    receive,
    failReceive
} from '../../src/reducers/request';

describe('IsFetching Reducer', function() {
    it ('Should return the initial state', () => {
        const response = isFetching( undefined, {} );
        assert.isFalse( response );
    });

    it ('Should handle REQUEST', () => {
        const response = isFetching( false, {
            type: REQUEST
        });
        assert.isTrue( response );
    });

    it ('Should handle RECEIVE', () => {
        const response = isFetching( true, {
            type: RECEIVE
        });
        assert.isFalse( response );
    });

    it ('Should handle FAIL_RECEIVE', () => {
        const response = isFetching( true, {
            type: FAIL_RECEIVE
        });
        assert.isFalse( response );
    });
});

describe('Request Reducer', function() {
    it ('Should return the initial state', () => {
        const response = request( undefined, {} );
        assert.deepEqual( response, {} );
    });

    it ('Should handle REQUEST', () => {
        const currentState = {
            foo: 'bar'
        };
        deepFreeze( currentState );

        const now = Date.now();
        const expectedState = {
            foo: 'bar',
            requestedAt: now,
            error: null,
            failedAt: null
        };

        assert.deepEqual(
            request( currentState, {
                type: REQUEST,
                requestedAt: now
            }),
            expectedState
        );
    });
});

describe('Receive Reducer', function() {
    it ('Should return the initial state', () => {
        const response = receive( undefined, {} );
        assert.deepEqual( response, {} );
    });

    it ('Should handle RECEIVE', () => {
        const currentState = {
            foo: 'bar'
        };
        deepFreeze( currentState );

        const result = {
            id: 1,
            something: 'cool'
        };
        deepFreeze( result );

        const now = Date.now();
        const expectedState = Object.assign({}, {
            foo: 'bar',
            receivedAt: now,
            error: null,
            failedAt: null
        }, result);

        assert.deepEqual(
            receive( currentState, {
                type: RECEIVE,
                receivedAt: now,
                result
            }),
            expectedState
        );
    });
});

describe('FailReceive Reducer', function() {
    it ('Should return the initial state', () => {
        const response = request( undefined, {} );
        assert.deepEqual( response, {} );
    });

    it ('Should handle FAIL_RECEIVE', () => {
        const currentState = {
            foo: 'bar',
            receivedAt: Date.now()
        };
        deepFreeze( currentState );

        const error = {
            message: 'An ugly error happened'
        };
        deepFreeze( error );

        const now = Date.now();
        const expectedState = {
            foo: 'bar',
            receivedAt: null,
            error,
            failedAt: now
        };

        assert.deepEqual(
            failReceive( currentState, {
                type: FAIL_RECEIVE,
                failedAt: now,
                error
            }),
            expectedState
        );
    });
});
