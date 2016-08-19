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

export function fetchNotesIfNeeded() {

    return ( dispatch, getState ) => {
        const { notes, session } = getState();

        if( shouldFetch( notes ) ) {
            return dispatch(
                fetchNotes( session.userId, session.id )
            );
        }else {
            return Promise.resolve();
        }
    };
}

export function fetchNotes() {

    return function( dispatch, getState ) {
        const { user, session } = getState();

        dispatch(request('notes'));

        let filter = {
            order: 'createdAt DESC'
        };
        let params = '?filter=' + encodeURIComponent(JSON.stringify( filter ) );

        return fetch( getUri( user.id ) + params, {
            method: 'GET',
            headers: jsonHeaders( session.id )
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(
            notes => dispatch(receive('notes', { notes })),
            err => dispatch(failReceive('notes', err))
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

export function addNote( note ) {
    return {
        type: ADD_NOTE,
        note
    };
}

export function createNote( note ) {

    return function( dispatch, getState ) {
        const { user, session } = getState();

        return fetch( getUri( user.id ), {
            method: 'POST',
            headers: jsonHeaders( session.id ),
            body: JSON.stringify(note)
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(note => dispatch( addNote( note ) ) )
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
