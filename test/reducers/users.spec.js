import { assert } from 'chai';
import deepFreeze from 'deep-freeze';

import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE,
    REMOVE_ACCESS,
} from '../../src/actions';

import {
    request,
    receive,
    failReceive,
} from '../../src/reducers/request';

import user from '../../src/reducers/user';

describe('User Reducer', () => {
    it('Should return the initial state', () => {
        const response = user(undefined, {});

        assert.deepEqual(response, {});
    });

    it('Should handle REQUEST', () => {
        const currentState = {};
        deepFreeze(currentState);

        const requestedAt = Date.now();

        const response = user(currentState, {
            type: REQUEST,
            name: 'user',
            requestedAt,
        });

        assert.deepEqual(response, request(currentState, {
            type: REQUEST,
            requestedAt,
        }));

        const responseWithWrongName = user(currentState, {
            type: REQUEST,
            name: 'not-user',
            requestedAt,
        });

        assert.deepEqual(responseWithWrongName, currentState);
    });

    it('Should handle RECEIVE', () => {
        const currentState = {};
        deepFreeze(currentState);

        const receivedAt = Date.now();

        const response = user(currentState, {
            type: RECEIVE,
            name: 'user',
            receivedAt,
        });

        assert.deepEqual(response, receive(currentState, {
            type: RECEIVE,
            receivedAt,
        }));

        const responseWithWrongName = user(currentState, {
            type: RECEIVE,
            name: 'not-user',
            receivedAt,
        });

        assert.deepEqual(responseWithWrongName, currentState);
    });

    it('Should handle FAIL_RECEIVE', () => {
        const currentState = {};
        deepFreeze(currentState);

        const failedAt = Date.now();
        const error = 'Some error';

        const response = user(currentState, {
            type: FAIL_RECEIVE,
            name: 'user',
            failedAt,
            error,
        });

        assert.deepEqual(response, failReceive(currentState, {
            type: FAIL_RECEIVE,
            name: 'user',
            failedAt,
            error,
        }));

        const responseWithWrongName = user(currentState, {
            type: FAIL_RECEIVE,
            name: 'not-user',
            failedAt,
            error,
        });

        assert.deepEqual(responseWithWrongName, currentState);
    });

    it('Should handle REMOVE_ACCESS', () => {
        const currentState = {
            id: 1,
            username: 'username',
            email: 'some@email.com',
        };
        deepFreeze(currentState);

        const response = user(currentState, {
            type: REMOVE_ACCESS,
        });

        assert.deepEqual(response, {});
    });
});
