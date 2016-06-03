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

        return fetch( NOTES_URL, {
            method: 'GET',
            headers: jsonHeaders(token.id)
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => {
            dispatch(receive('notes', json));
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

let lastId = 0;
export function addNote( note ) {
    return {
        type: ADD_NOTE,
        id: lastId ++,
        title: note.title,
        text: note.text,
        color: note.color
    };
}
