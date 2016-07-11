import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE,
    ACCESS,
    REMOVE_ACCESS
} from '../actions';

import {
    request,
    receive,
    failReceive
} from './request';

export function authorized(state = true, action = {}) {
    switch(action.type) {
        case REQUEST:
        case RECEIVE:
            return true;
        case FAIL_RECEIVE:
            if(
                !action.hasOwnProperty('error') ||
                !action.error.hasOwnProperty('response')
            ) {
                return true;
            }
            return action.error.response.status === 401 ? false : true;
        default:
            return state;
    }
}

export function session(state = {}, action = {}) {
    if(
        action.hasOwnProperty('name') &&
        action.name !== 'session'
    ) { return state; }

    switch(action.type) {
        case REQUEST:
            return request(state, action);
        case RECEIVE:
            return receive(state, action);
        case FAIL_RECEIVE:
            return failReceive(state, action);
        case REMOVE_ACCESS:
            return {};
        default:
            return state;
    }
}
