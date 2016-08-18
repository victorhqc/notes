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
        name,
        failedAt: Date.now(),
        error: Object.assign({}, json)
    };
}


export function shouldFetch( state ) {
    if ( state && state.isFetching ) {
        return false;
    }

    return true;
}
