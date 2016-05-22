import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE,
    REMOVE_ACCESS
} from '../actions';

const request = (state, action) => {
    switch(action.type) {
        case REQUEST:
            let obj = {};
            obj[action.name] = {
                isFetching: true,
                requestedAt: action.requestedAt,
                error: null,
                failedAt: null
            };

            return Object.assign({}, state, obj);
        default:
            return state;
    }
};

const receive = (state, action) => {
    switch(action.type) {
        case RECEIVE:

            let obj = {
                isFetching: false,
                receivedAt: action.receivedAt,
                error: null,
                failedAt: null
            }, response = {};

            obj = Object.assign({}, obj, action.result);

            response[action.name] = obj;

            return Object.assign({}, state, response);
        default:
            return state;
    }
};

const failReceive = (state, action) => {
    switch(action.type) {
        case FAIL_RECEIVE:
            let obj = {
                isFetching: false,
                receivedAt: null,
                error: action.error,
                failedAt: action.failedAt
            }, response = {};

            response[action.name] = obj;

            return Object.assign({}, state, response);
        default:
            return state;
    }
};

export function session(state = {}, action = {}) {

    switch(action.type) {
        case REQUEST:
            return request(state, action);
        case RECEIVE:
            return receive(state, action);
        case FAIL_RECEIVE:
            return failReceive(state, action);
        case REMOVE_ACCESS:
            return Object.assign({}, state, {
                ACCESS: false
            });
        default:
            return state;
    }
}
