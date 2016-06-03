import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE
} from '../actions';

import {
    request,
    receive,
    failReceive
} from './request';

export function user(state = {}, action = {}) {
    if( action.name !== 'user' ) { return state; }

    switch(action.type) {
        case REQUEST:
            return request(state, action);
        case RECEIVE:
            return receive(state, action);
        case FAIL_RECEIVE:
            return failReceive(state, action);
        default:
            return state;
    }
}
