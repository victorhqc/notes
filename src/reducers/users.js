import {
    REQUEST_ACCESS,
    RECEIVE_ACCESS,
    FAIL_RECEIVE_ACCESS,
    REQUEST_USER,
    RECEIVE_USER,
    FAIL_RECEIVE_USER
} from '../actions';

export function session(state = {
    isFetching: false,
    token: {},
    user: {}
}, action = {}) {

    switch(action.type) {
        case REQUEST_USER:
        case REQUEST_ACCESS:
            return Object.assign({}, state, {
                isFetching: true,
                error: null,
                requestedAt: action.requestedAt
            });
        case RECEIVE_ACCESS:
            return Object.assign({}, state, {
                isFetching: false,
                token: action.access,
                error: null,
                sessionSince: action.receivedAt
            });
        case RECEIVE_USER:
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                user: action.user
            });
        case FAIL_RECEIVE_USER:
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
