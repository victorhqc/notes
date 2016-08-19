import { assert } from 'chai';
import deepFreeze from 'deep-freeze';
import fetchMock from 'fetch-mock';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { url } from 'api';

import { cleanResponse } from '../../src/helpers/tests';

import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE
} from '../../src/actions/requests';

const middlewares = [ thunk ];
const mockStore = configureMockStore( middlewares );

const USER_ID = 1;
const TOKEN_ID = 'some_token';
const NOTES_URL = url + 'people/' + USER_ID + '/notes/';

describe('Notes Actions', function() {
    afterEach(() => fetchMock.reset() );

    const notes = [
        {
            id: 1,
            title: 'Hello World!',
            text: 'Lorem Ipsum...',
            color: '#ccc',
            type: 'text',
            createdAt: moment().format(),
            updatedAt: moment().format()
        },
        {
            id: 2,
            title: 'Foo Bar',
            text: 'Some text',
            color: '#fafafa',
            type: 'text',
            createdAt: moment().format(),
            updatedAt: moment().format()
        }
    ];

    const response = {
        body: notes,
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        sendAsJson: true
    };

    fetchMock.mock( new RegExp(NOTES_URL, 'gi'), response, {
        name: 'fetch-notes',
        method: 'GET',
        response
    } );

    const {
        fetchNotes,
        fetchNotesIfNeeded,
        OPEN_CREATE_NOTE,
        openCreateNote,
        CLOSE_CREATE_NOTE,
        closeCreateNote,
        CHANGE_COLOR,
        changeColor,
        ADD_NOTE,
        addNote,
        createNote,
        EDIT_NOTE,
        editNote
    } = require('../../src/actions/notes');

    it ('Should fetch notes', ( done ) => {
        const resultActions = [{
            type: REQUEST,
            name: 'notes',
            requestedAt: Date.now()
        }, {
            type: RECEIVE,
            name: 'notes',
            receivedAt: Date.now(),
            result: { notes }
        }];

        const { dispatch, getActions } = mockStore({
            session: { id: TOKEN_ID },
            user: { id: USER_ID }
        });

        dispatch( fetchNotes() )
        .then(() => {
            const { actions, expectedActions } = cleanResponse( getActions(), resultActions );
            assert.deepEqual( actions, expectedActions );
            done();
        })
        .catch( done );
    });

    it ('Should handle error in request for fetching notes', ( done ) => {

        const response = {
            body: {
                error: 'some error'
            },
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            sendAsJson: true
        };

        fetchMock.mock( new RegExp(NOTES_URL, 'gi'), response, {
            name: 'fail-fetch-notes',
            method: 'GET',
            response,
            matcher: ( url, opts ) => (
                opts &&
                opts.headers &&
                opts.headers.Authorization &&
                opts.headers.Authorization === 'BAD_TOKEN'
            )
        } );

        const resultActions = [{
            type: REQUEST,
            name: 'notes',
            requestedAt: Date.now()
        }, {
            type: FAIL_RECEIVE,
            name: 'notes',
            failedAt: Date.now()
        }];

        const { dispatch, getActions } = mockStore({
            session: { id: 'BAD_TOKEN' },
            user: { id: USER_ID }
        });

        dispatch( fetchNotes() )
        .then(() => {
            const { actions, expectedActions } = cleanResponse( getActions(), resultActions );
            const error = actions[1].error;
            delete actions[1].error;
            assert.deepEqual( actions, expectedActions );
            done();
        })
        .catch( done );
    });

    it ('Should fetch notes if needed', ( done ) => {
        const resultActions = [{
            type: REQUEST,
            name: 'notes',
            requestedAt: Date.now()
        }, {
            type: RECEIVE,
            name: 'notes',
            receivedAt: Date.now(),
            result: { notes }
        }];

        const { dispatch, getActions } = mockStore({
            session: { id: TOKEN_ID },
            user: { id: USER_ID }
        });

        dispatch( fetchNotesIfNeeded() )
        .then(() => {
            const { actions, expectedActions } = cleanResponse( getActions(), resultActions );
            assert.deepEqual( actions, expectedActions );
            done();
        })
        .catch( done );
    });

    it ('Should not fetch notes if not needed', ( done ) => {
        const resultActions = [];

        const { dispatch, getActions } = mockStore({
            session: { id: TOKEN_ID },
            user: { id: USER_ID },
            notes: {
                isFetching: true
            }
        });

        dispatch( fetchNotesIfNeeded() )
        .then(() => {
            assert.deepEqual( getActions(), resultActions );
            done();
        })
        .catch( done );
    });

    it ('Should open the create Note', () => {
        const expectedAction = {
            type: OPEN_CREATE_NOTE
        };

        assert.deepEqual( openCreateNote(), expectedAction );
    });

    it ('Should close the create Note', () => {
        const expectedAction = {
            type: CLOSE_CREATE_NOTE
        };

        assert.deepEqual( closeCreateNote(), expectedAction );
    });

    it ('Should change color of the note', () => {
        const color = '#ccc';
        const note = {
            id: 1,
            title: 'Foo Bar',
            text: 'Hello world'
        };

        const expectedAction = {
            type: CHANGE_COLOR,
            color,
            note
        };

        assert.deepEqual(
            changeColor( color, note ),
            expectedAction
        );
    });

    it ('Should add a Note', () => {
        const note = {
            id: 1,
            title: 'A new Note',
            text: 'Lorem Ipsum...'
        };

        const expectedAction = {
            type: ADD_NOTE,
            note
        };

        assert.deepEqual(
            addNote( note ),
            expectedAction
        );
    });

    it ('Should create a Note', ( done ) => {
        const note = {
            id: 1,
            title: 'A just created note',
            text: 'Hello world'
        };

        const response = {
            body: note,
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            sendAsJson: true
        };

        fetchMock.mock( new RegExp(NOTES_URL, 'gi'), response, {
            name: 'create-fetch-note',
            method: 'POST',
            response
        } );

        const resultActions = [{
            type: ADD_NOTE,
            note
        }];

        const { dispatch, getActions } = mockStore({
            session: { id: TOKEN_ID },
            user: { id: USER_ID }
        });

        dispatch( createNote() )
        .then(() => {
            assert.deepEqual( getActions(), resultActions );
            done();
        })
        .catch( done );
    });

    it ('Should edit a Note', () => {
        const note = {
            id: 1,
            title: 'Edited note',
            text: 'Changed!'
        };

        const expectedAction = {
            type: EDIT_NOTE,
            note
        };

        assert.deepEqual(
            editNote( note ),
            expectedAction
        );
    });
});
