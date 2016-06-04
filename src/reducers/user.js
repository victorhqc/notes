import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE,
    REMOVE_ACCESS
} from '../actions';

import {
    request,
    receive,
    failReceive
} from './request';

export function user(state = {}, action = {}) {
    if(
        action.hasOwnProperty('name') &&
        action.name !== 'user'
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
