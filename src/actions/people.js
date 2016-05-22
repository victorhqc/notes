import fetch from 'isomorphic-fetch';

import {
    JSON_HEADERS,
    checkStatus,
    parseJSON
} from '../helpers/fetch';

import {
    REQUEST,
    request,
    RECEIVE,
    receive,
    FAIL_RECEIVE,
    failReceive,
    shouldFetch
} from './requests';

import {
    setToken,
    forgetToken,
    getToken,
    setUser
} from './session';

import { url } from 'api';

export const PEOPLE_URL = url + 'people/';
export const ACCESS = 'ACCESS';
export const USER = 'USER';

export const REMOVE_ACCESS = 'REMOVE_ACCESS';

export function removeAccess() {
    forgetToken();

    return {
        type: REMOVE_ACCESS
    };
}

export function fetchAccess(email, password) {

    return function(dispatch) {

        // Start Login Process
        dispatch(request(ACCESS));

        // Actual login attempt
        return fetch( PEOPLE_URL + 'login', {
            method: 'POST',
            headers: JSON_HEADERS,
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => {
            setToken(json);
            dispatch(receive(ACCESS, json));
        })
        .catch(err =>
            dispatch(failReceive(ACCESS, err))
        );
    };
}

export function fetchAccessIfNeeded(username, password) {

    return (dispatch, getState) => {
        if( shouldFetch( getState().session.ACCESS ) ) {
            return dispatch( fetchAccess( username, password ) );
        }else {
            return Promise.resolve();
        }
    };
}

export function fetchUserIfNeeded() {

    return (dispatch, getState) => {
        if( shouldFetch( getState().session.USER ) ) {
            return dispatch( fetchCurrentUser() );
        }else {
            return Promise.resolve();
        }
    };
}

export function fetchCurrentUser() {
    const token = getToken();
    const id = token.userId;

    return function(dispatch) {

        // Start Login Process
        dispatch(request(USER));

        let headers = JSON_HEADERS;
        headers.Authorization = token.id;

        // Actual Fetch for user
        return fetch( PEOPLE_URL + id, {
            method: 'GET',
            headers: headers
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => {
            setUser(json);
            dispatch(receive(USER, json));
        })
        .catch(err =>
            dispatch(failReceive(USER, err))
        );
    };
}
