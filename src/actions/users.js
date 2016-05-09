import fetch from 'isomorphic-fetch';
import {
    JSON_HEADERS,
    checkStatus,
    parseJSON
} from '../helpers/fetch';

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
        access: Object.assign({}, json),
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

export function fetchAccess(username, password) {

    return function(dispatch) {

        // Start Login Process
        dispatch(requestAccess());

        // Actual login attempt
        return fetch('http://localhost:3000/v1/people/login', {
            method: 'POST',
            headers: JSON_HEADERS,
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json =>
            dispatch(receiveAccess(json))
        )
        .catch(err =>
            dispatch(failReceiveAccess(err))
        );
    };
}
