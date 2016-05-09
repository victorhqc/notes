import {
    REQUEST_ACCESS,
    RECEIVE_ACCESS,
    FAIL_RECEIVE_ACCESS
} from '../actions';

export function session(state = {
    isFetching: false,
    user: {}
}, action = {}) {

    switch(action.type) {
        case REQUEST_ACCESS:
            return Object.assign({}, state, {
                isFetching: true,
                error: null,
                requestedAt: action.requestedAt
            });
        case RECEIVE_ACCESS:
            return Object.assing({}, state, {
                isFetching: false,
                user: action.user,
                error: null,
                sessionSince: action.receivedAt
            });
        case FAIL_RECEIVE_ACCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                failedAt: action.failedAt
            });
        default:
            return state;
    }
}
