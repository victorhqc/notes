export const REQUEST_ACCESS = 'REQUEST_ACCESS';

export function requestAccess() {
    return {
        type: REQUEST_ACCESS,
        requestedAt: Date.now()
    };
}

export const RECEIVE_ACCESS = 'RECEIVE_ACCESS';

export function receiveAccess(json) {
    return {
        type: RECEIVE_ACCESS,
        result: Object.assign({}, json),
        receivedAt: Date.now()
    };
}

export const FAIL_RECEIVE_ACCESS = 'FAIL_RECEIVE_ACCESS';

export function failReceiveAccess(json) {
    return {
        type: FAIL_RECEIVE_ACCESS,
        error: Object.assign({}, json),
        failedAt: Date.now()
    };
}

export const REQUEST_USER = 'REQUEST_USER';

export function requestUser() {
    return {
        type: REQUEST_USER,
        requestedAt: Date.now()
    };
}

export const RECEIVE_USER = 'RECEIVE_USER';

export function receiveUser(json) {
    return {
        type: RECEIVE_USER,
        receivedAt: Date.now(),
        result: Object.assign({}, json)
    };
}

export const FAIL_RECEIVE_USER = 'FAIL_RECEIVE_USER';

export function failReceiveUser(json) {
    return {
        type: FAIL_RECEIVE_USER,
        error: Object.assign({}, json),
        failedAt: Date.now()
    };
}
