import {
    OPEN_CREATE_NOTE,
    CLOSE_CREATE_NOTE,
    ADD_NOTE
} from '../actions';

function note( state, action ) {
    switch ( action.type ) {
        case ADD_NOTE:
            return {
                id: action.id,
                title: action.title,
                text: action.text,
                color: action.color
            };
        default:
            return state;
    }
}

export function newNote(state = {
    creating: false,
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

    switch(action.type) {
        case ADD_NOTE:
            return Object.assign({}, state, {
                notes: allNotes(state, action)
            });
        default:
            return state;
    }
}
