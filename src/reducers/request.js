import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE,
    REMOVE_ACCESS
} from '../actions';

export function request(state, action) {
    switch(action.type) {
        case REQUEST:
            let obj = {
                isFetching: true,
                requestedAt: action.requestedAt,
                error: null,
                failedAt: null
            };

            return Object.assign({}, state, obj);
        default:
            return state;
    }
}

export function receive(state, action) {
    switch(action.type) {
        case RECEIVE:

            let obj = {
                isFetching: false,
                receivedAt: action.receivedAt,
                error: null,
                failedAt: null
            };

            obj = Object.assign({}, obj, action.result);
            return Object.assign({}, state, obj);
        default:
            return state;
    }
}

export function failReceive(state, action) {
    switch(action.type) {
        case FAIL_RECEIVE:
            let obj = {
                isFetching: false,
                receivedAt: null,
                error: action.error,
                failedAt: action.failedAt
            };

            return Object.assign({}, state, obj);
        default:
            return state;
    }
}
