import {
    REQUEST_NOTES,
    RECEIVE_NOTES,
    FAIL_RECEIVE_NOTES,
    SET_NOTE_COLOR,
    ADD_TEXT_NOTE,
    EDIT_NOTE,
    DELETE_NOTE,
    REQUEST_SAVE_NOTE,
    REQUEST_EDIT_NOTE,
    REQUEST_DELETE_NOTE,
    FAIL_SAVE_NOTE,
    FAIL_DELETE_NOTE
} from '../actions';

export function note( state, action ) {
    switch(action.type) {
        case SET_NOTE_COLOR:
            if( state.id !== action.id ) {
                return state;
            }

            return Object.assign({}, state, { color: action.color });
        case ADD_TEXT_NOTE:
            return {
                id: action.id,
                text: action.text,
                color: action.color
            };
        case EDIT_NOTE:
            if( state.id !== action.id ) {
                return state;
            }

            return Object.assign({}, state, action);
    }
}

export function notes(state = {
    isFetching: false,
    items: []
}, action = {}) {

    switch(action.type) {
        case REQUEST_NOTES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_NOTES:
            return Object.assing({}, state, {
                isFetching: false,
                items: action.notes,
                lastUpdated: actions.receivedAt
            });
        case FAIL_RECEIVE_NOTES:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                failedAt: action.failedAt
            });
        case EDIT_NOTE:
        case SET_NOTE_COLOR:
            return {
                isFetching: false,
                items: state.items.map( n => note(n, action) )
            };
        case ADD_TEXT_NOTE:
            return {
                isFetching: false,
                items: [
                    note( undefined, action),
                    ... state.items
                ]
            };
        case DELETE_NOTE:
            return {
                isFetching: false,
                items: [

                ]
            };
        default:
            return state;
    }
}
