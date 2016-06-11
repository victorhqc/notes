import fetch from 'isomorphic-fetch';

import {
    jsonHeaders,
    checkStatus,
    parseJSON
} from '../helpers/fetch';

import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE,
    request,
    receive,
    failReceive,
    shouldFetch
} from './requests';

import {
    PEOPLE_URL
} from './people';

export const NOTES = 'NOTES';

function getUri(userId) {
    return PEOPLE_URL + userId + '/notes/';
}

export function fetchNotes( userId, tokenId ) {

    return function( dispatch ) {
        dispatch(request('notes'));

        let filter = {
            order: 'createdAt DESC'
        };
        let params = '?filter=' + encodeURIComponent(JSON.stringify( filter ) );

        return fetch( getUri( userId ) + params, {
            method: 'GET',
            headers: jsonHeaders( tokenId )
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

export const CHANGE_COLOR = 'CHANGE_COLOR';

export function changeColor( color, note ) {
    return {
        type: CHANGE_COLOR,
        color,
        note
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
export function createNote( userId, tokenId, note ) {

    return function( dispatch ) {

        return fetch( getUri( userId ), {
            method: 'POST',
            headers: jsonHeaders(tokenId),
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

export const EDIT_NOTE = 'EDIT_NOTE';

export function editNote( note ) {
    return {
        type: EDIT_NOTE,
        note
    };
}
