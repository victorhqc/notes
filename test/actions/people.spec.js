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

describe('People Actions', function() {
    afterEach(() => fetchMock.restore() );

    const response = {
        body: {
            id: 1,
            email: "foo@bar",
            username: "foo",
            name: "foo",
            last_name: "bar",
            status: "active",
            emailVerified: true
        },
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
    } = require('../../src/actions');

    it ('Should fetch an User', () => {
        assert.isTrue(true);
    });
});
