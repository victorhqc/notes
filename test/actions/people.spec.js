import { assert } from 'chai';
import deepFreeze from 'deep-freeze';
import fetchMock from 'fetch-mock';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { url } from 'api';

const middlewares = [ thunk ];
const mockStore = configureMockStore( middlewares );

export const PEOPLE_URL = url + 'people/';

const cleanResponseTimestamps = ( actions, expectedActions ) => {
    expectedActions[0].requestedAt = actions[0].requestedAt;
    expectedActions[1].receivedAt = actions[1].receivedAt;

    return {
        expectedActions,
        actions
    };
};

describe('People Actions', function() {
    afterEach(() => fetchMock.restore() );

    const user = {
        id: 1,
        email: "foo@bar",
        username: "foo",
        name: "foo",
        last_name: "bar",
        status: "active",
        emailVerified: true
    };

    const response = {
        body: user,
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        sendAsJson: true
    };

    fetchMock.mock(PEOPLE_URL + 1, response, {
        name: 'fetch-user',
        method: 'GET',
        response
    });

    const {
        fetchUserIfNeeded,
        fetchCurrentUser,
        REQUEST,
        RECEIVE
    } = require('../../src/actions');

    it ('Should fetch an User', ( done ) => {
        const resultActions = [{
            type: REQUEST,
            name: 'user',
            requestedAt: Date.now()
        }, {
            type: RECEIVE,
            name: 'user',
            receivedAt: Date.now(),
            result: user
        }];

        const { dispatch, getActions } = mockStore({});

        dispatch( fetchCurrentUser( 1, 'some_token') )
        .then(() => {
            const { actions, expectedActions } = cleanResponseTimestamps( getActions(), resultActions );
            assert.deepEqual( actions, expectedActions );
            done();
        })
        .catch( done );
    });

    it ('Should fetch an user if needed', ( done ) => {
        fetchMock.mock(PEOPLE_URL + 1, response, {
            name: 'fetch-user',
            method: 'GET',
            response
        });

        const resultActions = [{
            type: REQUEST,
            name: 'user',
            requestedAt: Date.now()
        }, {
            type: RECEIVE,
            name: 'user',
            receivedAt: Date.now(),
            result: user
        }];

        const { dispatch, getActions } = mockStore({
            session: {
                id: 'some_token',
                userId: 1
            },
            isFetching: false
        });

        dispatch( fetchUserIfNeeded() )
        .then(() => {
            const { actions, expectedActions } = cleanResponseTimestamps( getActions(), resultActions );
            assert.deepEqual( actions, expectedActions );
            done();
        })
        .catch( done );
    });

    it ('Shoult not fetch an user if not needed', ( done ) => {
        fetchMock.mock(PEOPLE_URL + 1, response, {
            name: 'fetch-user',
            method: 'GET',
            response
        });

        const resultActions = [];

        const { dispatch, getActions } = mockStore({
            session: {
                id: 'some_token',
                userId: 1
            },
            isFetching: true
        });

        dispatch( fetchUserIfNeeded() )
        .then(() => {
            assert.deepEqual( getActions(), resultActions );
            done();
        })
        .catch( done );
    });
});
