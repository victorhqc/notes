import {
    OPEN_CREATE_NOTE,
    CLOSE_CREATE_NOTE,
    CHANGE_COLOR,
    ADD_NOTE,
    EDIT_NOTE,
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE,
    REMOVE_ACCESS,
} from '../actions';

import {
    request,
    receive,
    failReceive,
} from './request';

export function note(state = {}, action = {}) {
    switch (action.type) {
    case ADD_NOTE:
        return Object.assign({}, state, action.note);
    default:
        return state;
    }
}

export function editNote(state = {}, action = {}) {
    switch (action.type) {
    case EDIT_NOTE:
        return Object.assign({}, state, action.note);
    case REMOVE_ACCESS:
        return {};
    default:
        return state;
    }
}

export function newNote(state = {
    creating: false,
    color: '#fff',
    title: '',
    text: '',
}, action = {}) {
    switch (action.type) {
    case OPEN_CREATE_NOTE:
        return Object.assign({}, state, {
            creating: true,
            title: '',
            text: '',
        });
    case CLOSE_CREATE_NOTE:
        return Object.assign({}, state, {
            creating: false,
            title: '',
            text: '',
        });
    case CHANGE_COLOR:
        if (!state.creating) { return state; }

        return Object.assign({}, state, {
            color: action.color,
        });
    case REMOVE_ACCESS:
        return {};
    default:
        return state;
    }
}

function allNotes(state = [], action = {}) {
    switch (action.type) {
    case ADD_NOTE:
        return [
            note(undefined, action),
            ...state,
        ];
    default:
        return state;
    }
}

export function notes(state = {
    notes: [],
}, action = {}) {
    if (
        action.name &&
        action.name !== 'notes'
    ) {
        return state;
    }

    switch (action.type) {
    case ADD_NOTE:
        return Object.assign({}, state, {
            notes: allNotes(state.notes, action),
        });
    case REQUEST:
        return request(state, action);
    case RECEIVE:
        return receive(state, action);
    case FAIL_RECEIVE:
        return failReceive(state, action);
    case REMOVE_ACCESS:
        return [];
    default:
        return state;
    }
}
