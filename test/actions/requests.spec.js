import { assert } from 'chai';
import deepFreeze from 'deep-freeze';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import {
    REQUEST,
    request,
    RECEIVE,
    receive,
    FAIL_RECEIVE,
    failReceive,
    shouldFetch
} from '../../src/actions/requests';

describe('Requests Actions', function() {

    const name = 'something';

    it ('Should request', () => {
        const expectedAction = {
            type: REQUEST,
            name,
            requestedAt: Date.now()
        };

        assert.deepEqual( request( name ), expectedAction );
    });

    it ('Should receive', () => {

        const result = {
            id: 1,
            foo: 'bar'
        };

        const expectedAction= {
            type: RECEIVE,
            name,
            receivedAt: Date.now(),
            result
        };

        assert.deepEqual( receive( name, result ), expectedAction );
    });

    it ('Should fail receive', () => {
        const error = {
            message: 'Some error'
        };

        const expectedAction = {
            type: FAIL_RECEIVE,
            name,
            failedAt: Date.now(),
            error
        };

        assert.deepEqual( failReceive( name, error ), expectedAction );
    });

    it ('Should check if fetchable', () => {
        assert.isTrue( shouldFetch() );
        assert.isTrue( shouldFetch( { isFetching: false } ) );
        assert.isFalse( shouldFetch( { isFetching: true } ) );
    });
});
