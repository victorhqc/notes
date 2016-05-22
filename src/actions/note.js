export const TOGGLE_CREATE_NOTE = 'TOGGLE_CREATE_NOTE';

export function toggleCreateNote() {
    return {
        type: TOGGLE_CREATE_NOTE
    };
}

export const WRITE_NOTE = 'WRITE_NOTE';

export function writeNote(editor) {
    return {
        type: WRITE_NOTE,
        editor
    };
}
