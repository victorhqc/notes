import {
    REQUEST_NOTES,
    RECEIVE_NOTES,
    FAIL_RECEIVE_NOTES
} from '../actions';

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
            return Object.assign({}, state, {
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
        default:
            return state;
    }
}
