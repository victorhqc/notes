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

let accessToken = '';
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
        .then(json => {
            accessToken = json.id;
            //window.localStorage.setItem('session', JSON.stringify(json));

            dispatch(receiveAccess(json));
        })
        .catch(err =>
            dispatch(failReceiveAccess(err))
        );
    };
}

export function shouldFetchSession(state) {
    const session = state.session;
    if( !session ) {
        return true;
    } else if( session.isFetching ) {
        return false;
    } else {
        return true;
    }
}

export function fetchAccessIfNeeded(username, password) {

    return (dispatch, getState) => {
        if( shouldFetchSession( getState() ) ) {
            return dispatch( fetchAccess( username, password ) );
        }else {
            return Promise.resolve();
        }
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
        user: Object.assign({}, json)
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

export function fetchCurrentUser(id) {

    return function(dispatch) {

        // Start Login Process
        dispatch(requestUser());

        let headers = JSON_HEADERS;
        headers.Authorization = accessToken;

        // Actual Fetch for user
        return fetch('http://localhost:3000/v1/people/' + id, {
            method: 'GET',
            headers: headers
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json =>
            dispatch(receiveUser(json))
        )
        .catch(err =>
            dispatch(failReceiveUser(err))
        );
    };
}
