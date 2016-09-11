import { assert } from 'chai';
import deepFreeze from 'deep-freeze';

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
} from '../../src/actions';

import {
    request,
    receive,
    failReceive,
} from '../../src/reducers/request';

import {
    note,
    editNote,
    newNote,
    allNotes,
    notes,
} from '../../src/reducers/notes';

describe('Note Reducer', () => {
    it('Should return the initial state', () => {
        const response = note(undefined, {});
        assert.deepEqual(response, {});
    });

    it('Should handle ADD_NOTE', () => {
        const currentState = {
            title: 'Hello',
        };
        deepFreeze(currentState);

        const response = note(currentState, {
            type: ADD_NOTE,
            note: {
                text: 'Foo Bar',
                color: '#f6f6f6',
            },
        });

        const expectedState = {
            title: 'Hello',
            text: 'Foo Bar',
            color: '#f6f6f6',
        };

        assert.deepEqual(response, expectedState);
    });
});

describe('EditNote Reducer', () => {
    it('Should return the initial state', () => {
        const response = editNote(undefined, {});
        assert.deepEqual(response, {});
    });

    it('Should handle EDIT_NOTE', () => {
        const currentState = {
            id: 1,
            title: 'Foo bar',
            text: 'Why so serious?',
            color: '#ccc',
        };

        deepFreeze(currentState);

        const editedNote = {
            id: 1,
            title: 'Foo bar!!',
            text: 'Juan Perrito',
            color: '#fafafa',
        };

        deepFreeze(editedNote);

        const response = editNote(currentState, {
            type: EDIT_NOTE,
            note: editedNote,
        });

        assert.deepEqual(response, editedNote);
    });

    it('Should handle REMOVE_ACCESS', () => {
        const currentState = {
            id: 1,
            title: 'Some Note',
            text: 'Oh no!',
            color: '#ccc',
        };

        deepFreeze(currentState);

        const response = editNote(currentState, {
            type: REMOVE_ACCESS,
        });

        assert.deepEqual(response, {});
    });
});

describe('NewNote Reducer', () => {
    it('Should return the initial state', () => {
        const response = newNote(undefined, {});
        assert.deepEqual(response, {
            creating: false,
            color: '#fff',
            title: '',
            text: '',
        });
    });

    it('Should handle OPEN_CREATE_NOTE', () => {
        const currentState = {
            creating: false,
            color: '#fafafa',
            title: 'Hello World',
            text: 'Foo Bar',
        };

        deepFreeze(currentState);

        const response = newNote(currentState, {
            type: OPEN_CREATE_NOTE,
        });

        assert.deepEqual(response, {
            creating: true,
            color: '#fafafa',
            title: '',
            text: '',
        });
    });

    it('Should handle CLOSE_CREATE_NOTE', () => {
        const currentState = {
            creating: true,
            color: '#ccc',
            title: 'Something cool',
            text: 'Lorem Ipsum',
        };

        deepFreeze(currentState);

        const response = newNote(currentState, {
            type: CLOSE_CREATE_NOTE,
        });

        assert.deepEqual(response, {
            creating: false,
            color: '#ccc',
            title: '',
            text: '',
        });
    });

    it('Should handle CHANGE_COLOR', () => {
        const currentState = {
            creating: true,
            color: '#fafafa',
            title: 'Color Changing!',
            text: 'Omg',
        };

        deepFreeze(currentState);

        const response = newNote(currentState, {
            type: CHANGE_COLOR,
            color: '#333',
        });

        assert.deepEqual(response, {
            creating: true,
            color: '#333',
            title: 'Color Changing!',
            text: 'Omg',
        });
    });

    it('Should handle REMOVE_ACCESS', () => {
        const currentState = {
            creating: true,
            color: '#fafafa',
            title: 'Hello World',
            text: 'Foo Bar',
        };

        deepFreeze(currentState);

        const response = newNote(currentState, {
            type: REMOVE_ACCESS,
        });

        assert.deepEqual(response, {});
    });
});

describe('AllNotes Reducer', () => {
    it('Should return the initial state', () => {
        const response = allNotes(undefined, {});

        assert.isArray(response);
        assert.lengthOf(response, 0);
    });

    it('Should handle ADD_NOTE', () => {
        const currentState = [
            {
                id: 2,
                title: 'Im a Note',
                text: 'Hello World!',
            },
            {
                id: 1,
                title: 'I was the first Note',
                text: 'Foo Bar',
            },
        ];

        deepFreeze(currentState);

        const addingNote = {
            id: 3,
            title: 'Now Im the newest note',
            text: 'All the newest notes will be at the beginning of the array',
        };

        const expectedState = [
            addingNote,
            ...currentState,
        ];

        const response = allNotes(currentState, {
            type: ADD_NOTE,
            note: addingNote,
        });

        assert.sameDeepMembers(response, expectedState);
    });
});

describe('Notes Reducer', () => {
    it('Should return the initial state', () => {
        const response = notes(undefined, {});

        assert.deepEqual(response, {
            notes: [],
        });
    });

    it('Should handle ADD_NOTE', () => {
        const currentState = {
            notes: [
                {
                    id: 2,
                    title: 'Im a Note',
                    text: 'Hello World!',
                },
                {
                    id: 1,
                    title: 'I was the first Note',
                    text: 'Foo Bar',
                },
            ],
        };

        deepFreeze(currentState);

        const addingNote = {
            id: 3,
            title: 'Now Im the newest note',
            text: 'All the newest notes will be at the beginning of the array',
        };

        const expectedState = {
            notes: [
                addingNote,
                ...currentState.notes,
            ],
        };

        const response = notes(currentState, {
            type: ADD_NOTE,
            note: addingNote,
        });

        assert.deepEqual(response, expectedState);
        assert.sameDeepMembers(response.notes, expectedState.notes);
    });

    it('Should handle REQUEST', () => {
        const currentState = {
            notes: [],
        };

        deepFreeze(currentState);

        const requestedAt = Date.now();

        const response = notes(currentState, {
            type: REQUEST,
            name: 'notes',
            requestedAt,
        });

        assert.deepEqual(response, request(currentState, {
            type: REQUEST,
            requestedAt,
        }));

        const responseWithWrongName = notes(currentState, {
            type: REQUEST,
            name: 'not-notes',
            requestedAt,
        });

        assert.deepEqual(responseWithWrongName, currentState);
    });

    it('Should handle RECEIVE', () => {
        const currentState = {
            notes: [],
        };

        deepFreeze(currentState);

        const receivedAt = Date.now();

        const response = notes(currentState, {
            type: RECEIVE,
            name: 'notes',
            receivedAt,
        });

        assert.deepEqual(response, receive(currentState, {
            type: RECEIVE,
            receivedAt,
        }));

        const responseWithWrongName = notes(currentState, {
            type: RECEIVE,
            name: 'not-notes',
            receivedAt,
        });

        assert.deepEqual(responseWithWrongName, currentState);
    });

    it('Should handle FAIL_RECEIVE', () => {
        const currentState = {
            notes: [],
        };

        deepFreeze(currentState);

        const failedAt = Date.now();
        const error = 'Some nasty error';

        const response = notes(currentState, {
            type: FAIL_RECEIVE,
            name: 'notes',
            failedAt,
            error,
        });

        assert.deepEqual(response, failReceive(currentState, {
            type: FAIL_RECEIVE,
            failedAt,
            error,
        }));

        const responseWithWrongName = notes(currentState, {
            type: FAIL_RECEIVE,
            name: 'not-notes',
            failedAt,
            error,
        });

        assert.deepEqual(responseWithWrongName, currentState);
    });

    it('Should handle REMOVE_ACCESS', () => {
        const currentState = {
            notes: [
                {
                    id: 1,
                    title: 'Im a Simple note',
                    text: 'This should be deleted on REMOVE_ACCESS',
                    color: '#ccc',
                },
            ],
        };

        deepFreeze(currentState);

        const response = notes(currentState, {
            type: REMOVE_ACCESS,
        });

        assert.deepEqual(response, {
            notes: [],
        });
    });
});
