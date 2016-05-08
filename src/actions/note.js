export const SET_NOTE_COLOR = 'SET_NOTE_COLOR';

/*
 Setters
 */

export function setNoteColor(id, color) {
    return {
        type: SET_NOTE_COLOR,
        id,
        color
    };
}

/*
 Action Starters
 */

export const EDIT_NOTE = 'EDIT_NOTE';

export function editNote(id) {
    return {
        type: EDIT_NOTE,
        id
    };
}

export const DELETE_NOTE = 'DELETE_NOTE';

export function deleteNote(id) {
    return {
        type: DELETE_NOTE,
        id
    };
}

/*
 Requests
 */

export const REQUEST_SAVE_NOTE = 'REQUEST_SAVE_NOTE';

export function requestSaveNote(id) {
    return {
        type: REQUEST_SAVE_NOTE,
        requestedAt: Date.now(),
        id
    };
}

export const REQUEST_EDIT_NOTE = 'REQUEST_EDIT_NOTE';

export function requestEditNote(id) {
    return {
        type: REQUEST_EDIT_NOTE,
        requestedAt: Date.now(),
        id
    };
}

export const REQUEST_DELETE_NOTE = 'REQUEST_DELETE_NOTE';

export function requestDeleteNote(id) {
    return {
        type: REQUEST_DELETE_NOTE,
        requestedAt: Date.now(),
        id
    };
}

/*
 Failed requests
 */
export const FAIL_SAVE_NOTE = 'FAIL_SAVE_NOTE';

export function failSaveNote(id, json) {
    return {
        type: FAIL_SAVE_NOTE,
        error: Object.assign({}, json),
        failedAt: Date.now(),
        id
    };
}

export const FAIL_DELETE_NOTE = 'FAIL_DELETE_NOTE';

export function failDeleteNote(id) {
    return {
        type: FAIL_DELETE_NOTE,
        failedAt: Date.now(),
        id
    };
}
