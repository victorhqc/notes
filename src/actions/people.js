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
    forgetToken
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
        if( shouldFetch( getState().session ) ) {
            return dispatch( fetchAccess( username, password ) );
        }else {
            return Promise.resolve();
        }
    };
}

export function fetchCurrentUser(id) {

    return function(dispatch) {

        // Start Login Process
        dispatch(request(USER));

        let headers = JSON_HEADERS;
        headers.Authorization = accessToken;

        // Actual Fetch for user
        return fetch( peopleUrl + id, {
            method: 'GET',
            headers: headers
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json =>
            dispatch(receive(USER, json))
        )
        .catch(err =>
            dispatch(failReceive(USER, err))
        );
    };
}
