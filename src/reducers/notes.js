import {
    OPEN_CREATE_NOTE,
    CLOSE_CREATE_NOTE,
    CHANGE_COLOR,
    ADD_NOTE,
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE
} from '../actions';

import {
    request,
    receive,
    failReceive
} from './request';

function note( state, action ) {
    switch ( action.type ) {
        case ADD_NOTE:
            return Object.assign({}, action.note);
        default:
            return state;
    }
}

export function newNote(state = {
    creating: false,
    color: '#fff',
    title: '',
    text: ''
}, action = {}) {
    switch(action.type) {
        case OPEN_CREATE_NOTE:
            return Object.assign({}, state, {
                creating: true,
                title: '',
                text: ''
            });
        case CLOSE_CREATE_NOTE:
            return Object.assign({}, state, {
                creating: false,
                title: '',
                text: ''
            });
        case CHANGE_COLOR:
            if( !state.creating ) { return state; }

            return Object.assign({}, state, {
                color: action.color
            });
        default:
            return state;
    }
}

function allNotes(state = [], action = {}) {

    switch(action.type) {
        case ADD_NOTE:
            return [
                note( undefined, action ),
                ...state
            ];
        default:
            return state;
    }
}

export function notes(state = {
    notes: []
}, action = {}) {

    if(
        action.hasOwnProperty('name') &&
        action.name !== 'notes'
    ) {
        return state;
    }

    switch(action.type) {
        case ADD_NOTE:
            return Object.assign({}, state, {
                notes: allNotes(state.notes, action)
            });
        case REQUEST:
            return request(state, action);
        case RECEIVE:
            return receive(state, action);
        case FAIL_RECEIVE:
            return failReceive(state, action);
        default:
            return state;
    }
}
