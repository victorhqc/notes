export const REQUEST = 'REQUEST';

export function request(name) {
    return {
        type: REQUEST,
        requestedAt: Date.now(),
        name
    };
}

export const RECEIVE = 'RECEIVE';

export function receive(name, json) {
    return {
        type: RECEIVE,
        result: Object.assign({}, json),
        receivedAt: Date.now(),
        name
    };
}

export const FAIL_RECEIVE = 'FAIL_RECEIVE';

export function failReceive(name, json) {
    return {
        type: FAIL_RECEIVE,
        error: Object.assign({}, json),
        failedAt: Date.now(),
        name
    };
}


export function shouldFetch(state) {
    if(!state.isFetching ) {
        return true;
    } else if( state.isFetching ) {
        return false;
    } else {
        return true;
    }
}
