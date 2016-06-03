import fetch from 'isomorphic-fetch';

import {
    jsonHeaders,
    checkStatus,
    parseJSON
} from '../helpers/fetch';

import {
    REQUEST,
    RECEIVE,
    FAIL_RECEIVE,
    request,
    receive,
    failReceive,
    shouldFetch
} from './requests';

import {
    PEOPLE_URL
} from './people';

import { url } from 'api';

export const ACCESS = 'ACCESS';

export function setToken(token) {
    window.localStorage.setItem(ACCESS, JSON.stringify(token));
}

export function forgetToken() {
    window.localStorage.clear();
}

export function getToken() {
    let token = window.localStorage.getItem(ACCESS);
    if( token ) { return JSON.parse(token); }

    return false;
}

export const REMOVE_ACCESS = 'REMOVE_ACCESS';

export function setAccess(token) {
    return {
        type: ACCESS,
        name: 'session',
        token
    };
}

export function removeAccess() {
    forgetToken();

    return {
        type: REMOVE_ACCESS
    };
}

export function fetchAccess(email, password) {

    return function(dispatch) {

        // Start Login Process
        dispatch(request('session'));

        // Actual login attempt
        return fetch( PEOPLE_URL + 'login', {
            method: 'POST',
            headers: jsonHeaders(),
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => {
            setToken(json);
            dispatch(receive('session', json));
        })
        .catch(err =>
            dispatch(failReceive('session', err))
        );
    };
}

export function fetchAccessIfNeeded(username, password) {

    return (dispatch, getState) => {
        if( shouldFetch( getState().session ) ) {
            return dispatch( fetchAccess( username, password ) );
        }else {
            return Promise.resolve();
        }
    };
}
