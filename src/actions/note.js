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

export const WRITE_NOTE = 'WRITE_NOTE';

export function writeNote(text) {
    return {
        type: WRITE_NOTE,
        text
    };
}
