import fetch from 'isomorphic-fetch';

import {
    jsonHeaders,
    checkStatus,
    parseJSON
} from '../helpers/fetch';

import {
    REQUEST,
    request,
    RECEIVE,
    receive,
    FAIL_RECEIVE,
    failReceive,
    shouldFetch
} from './requests';

import {
    getToken
} from './session';

import {
    PEOPLE_URL,
    getUser
} from './people';

const userId = (getUser()) ? getUser().id : '';
export const NOTES_URL = PEOPLE_URL + userId + '/notes/';
export const NOTES = 'NOTES';

export function fetchNotes() {
    const token = getToken();

    return function( dispatch ) {
        dispatch(request('notes'));

        let filter = {
            order: 'createdAt DESC'
        };
        let params = '?filter=' + encodeURIComponent(JSON.stringify( filter ) );

        return fetch( NOTES_URL + params, {
            method: 'GET',
            headers: jsonHeaders(token.id)
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => {
            dispatch(receive('notes', { notes: json }));
        })
        .catch(err =>
            dispatch(failReceive('notes', err))
        );
    };
}

export const OPEN_CREATE_NOTE = 'OPEN_CREATE_NOTE';

export function openCreateNote() {
    return {
        type: OPEN_CREATE_NOTE
    };
}

export const CLOSE_CREATE_NOTE = 'CLOSE_CREATE_NOTE';

export function closeCreateNote() {
    return {
        type: CLOSE_CREATE_NOTE
    };
}

export const ADD_NOTE = 'ADD_NOTE';

function addNote( note ) {
    return {
        type: ADD_NOTE,
        note
    };
}

let lastId = 0;
export function createNote( note ) {
    const token = getToken();

    return function( dispatch ) {

        return fetch( NOTES_URL, {
            method: 'POST',
            headers: jsonHeaders(token.id),
            body: JSON.stringify(note)
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch( addNote(json) ) )
        .catch(err =>
            console.log(err)
        );
    };
}
