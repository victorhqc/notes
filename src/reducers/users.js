import {
    REQUEST_ACCESS,
    RECEIVE_ACCESS,
    FAIL_RECEIVE_ACCESS,
    REQUEST_USER,
    RECEIVE_USER,
    FAIL_RECEIVE_USER
} from '../actions';

const key = (state, action) => {
    switch(action.type) {
        case REQUEST_ACCESS:
        case RECEIVE_ACCESS:
        case FAIL_RECEIVE_ACCESS:
            return Object.assign({}, action, {key: 'token'});
        case REQUEST_USER:
        case RECEIVE_USER:
        case FAIL_RECEIVE_USER:
            return Object.assign({}, action, {key: 'user'});
        default:
            return {};
    }
};

export function session(state = {
    isFetching: false,
    token: {},
    user: {}
}, action = {}) {

    action = key(undefined, action);

    let obj = {};
    obj[action.key] = {
        isFetching: false,
        error: null,
        failedAt: null
    };

    switch(action.type) {
        case REQUEST_USER:
        case REQUEST_ACCESS:
            obj[action.key].isFetching = true;
            obj[action.key].requestedAt = action.requestedAt;

            return Object.assign({}, state, obj);
        case RECEIVE_ACCESS:
        case RECEIVE_USER:
            obj[action.key].receivedAt = action.receivedAt;
            obj = Object.assign({}, obj, action.result);

            return Object.assign({}, state, obj);
        case FAIL_RECEIVE_USER:
        case FAIL_RECEIVE_ACCESS:
            obj[action.key].isFetching = false;
            obj[action.key].error = action.error;
            obj[action.key].failedAt = action.failedAt;

            return Object.assign({}, state, obj);
        default:
            return state;
    }
}
