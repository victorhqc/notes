export const REQUEST = 'REQUEST';

export function request(name) {
    return {
        type: REQUEST,
        name,
        requestedAt: Date.now()
    };
}

export const RECEIVE = 'RECEIVE';

export function receive(name, json) {
    return {
        type: RECEIVE,
        name,
        receivedAt: Date.now(),
        result: Object.assign({}, json)
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


export function shouldFetch( state, isFetching ) {
    if ( !isFetching ) {
        return true;
    }

    return false;
}
