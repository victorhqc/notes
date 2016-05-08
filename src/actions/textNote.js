export const ADD_TEXT_NOTE = 'ADD_TEXT_NOTE';

export function addTextNote(note) {
    return {
        type: ADD_TEXT_NOTE,
        id: note.id,
        text: note.text,
        color: '#fff'
    };
}
