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

export function session(state = {
    token: false
}, action = {}) {
    if( action.name !== 'session' ) { return state; }

    switch(action.type) {
        case REQUEST:
            return request(state, action);
        case RECEIVE:
            return receive(state, action);
        case FAIL_RECEIVE:
            return failReceive(state, action);
        case ACCESS:
            return Object.assign({}, state, {
                token: action.token
            });
        case REMOVE_ACCESS:
            return Object.assign({}, state, {
                token: false
            });
        default:
            return state;
    }
}
