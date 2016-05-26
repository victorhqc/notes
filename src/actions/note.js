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

export function addNote( note ) {
    return {
        type: ADD_NOTE,
        title: note.title,
        text: note.text,
        color: note.color
    };
}
