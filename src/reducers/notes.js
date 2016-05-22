import {
    TOGGLE_CREATE_NOTE,
    WRITE_NOTE
} from '../actions';

export function newNote(state = {
    creating: false,
    editor: null
}, action = {}) {
    switch(action.type) {
        case TOGGLE_CREATE_NOTE:
            return Object.assign({}, state, {
                creating: !state.creating,
                editor: state.creating ? null : state.editor
            });
        case WRITE_NOTE:
            return Object.assign({}, state, {
                editor: action.editor
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
