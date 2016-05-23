import {
    OPEN_CREATE_NOTE,
    CLOSE_CREATE_NOTE,
    WRITE_NOTE
} from '../actions';

export function newNote(state = {
    creating: false,
    text: 'Write a note...'
}, action = {}) {
    switch(action.type) {
        case OPEN_CREATE_NOTE:
            return Object.assign({}, state, {
                creating: true,
                text: ''
            });
        case CLOSE_CREATE_NOTE:
            return Object.assign({}, state, {
                creating: false,
                text: 'Write a note...'
            });
        case WRITE_NOTE:
            return Object.assign({}, state, {
                text: action.text
            });
        default:
            return state;
    }
}

export function notes(state = [], action = {}) {

    switch(action.type) {
        default:
            return state;
    }
}
