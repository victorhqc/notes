import { assert } from 'chai';
import deepFreeze from 'deep-freeze';
import fetchMock from 'fetch-mock';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { url } from 'api';

import {
    RECEIVE,
    REQUEST
} from '../../src/actions/requests';

import { cleanResponse } from '../../src/helpers/tests';

const middlewares = [ thunk ];
const mockStore = configureMockStore( middlewares );

export const PEOPLE_URL = url + 'people/';

describe('People Actions', function() {
    afterEach(() => fetchMock.reset() );

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
        fetchCurrentUser
    } = require('../../src/actions/people');

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
            const { actions, expectedActions } = cleanResponse( getActions(), resultActions );
            assert.deepEqual( actions, expectedActions );
            done();
        })
        .catch( done );
    });

    it ('Should fetch an user if needed', ( done ) => {

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
            user: {
                isFetching: false
            }
        });

        dispatch( fetchUserIfNeeded() )
        .then(() => {
            const { actions, expectedActions } = cleanResponse( getActions(), resultActions );
            assert.deepEqual( actions, expectedActions );
            done();
        })
        .catch( done );
    });

    it ('Shoult not fetch an user if not needed', ( done ) => {

        const resultActions = [];

        const { dispatch, getActions } = mockStore({
            session: {
                id: 'some_token',
                userId: 1
            },
            user: {
                isFetching: true
            }
        });

        dispatch( fetchUserIfNeeded() )
        .then(() => {
            assert.deepEqual( getActions(), resultActions );
            done();
        })
        .catch( done );
    });
});
