import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE,
} from '../actions';

export function isFetching(state, action) {
    switch (action.type) {
    case REQUEST:
        return true;
    case RECEIVE:
    case FAIL_RECEIVE:
        return false;
    default:
        return false;
    }
}

export function request(state = {}, action = {}) {
    switch (action.type) {
    case REQUEST:
        return Object.assign({}, state, {
            requestedAt: action.requestedAt,
            error: null,
            failedAt: null,
            isFetching: isFetching(false, action),
        });
    default:
        return state;
    }
}

export function receive(state = {}, action = {}) {
    switch (action.type) {
    case RECEIVE:
        return Object.assign(
            {},
            state,
            Object.assign({}, {
                receivedAt: action.receivedAt,
                error: null,
                failedAt: null,
                isFetching: isFetching(false, action),
            }, action.result)
        );
    default:
        return state;
    }
}

export function failReceive(state = {}, action = {}) {
    switch (action.type) {
    case FAIL_RECEIVE:
        return Object.assign({}, state, {
            receivedAt: null,
            error: action.error,
            failedAt: action.failedAt,
            isFetching: isFetching(false, action),
        });
    default:
        return state;
    }
}
