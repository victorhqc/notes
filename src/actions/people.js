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
    getToken,
} from './session';

import { url } from 'api';

export const PEOPLE_URL = url + 'people/';
export const USER = 'USER';

export function setUser(json) {
    window.localStorage.setItem(USER, JSON.stringify(json));
}

export function getUser() {
    let user = window.localStorage.getItem(USER);
    if( user ) { return JSON.parse(user); }

    return false;
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

        // Actual Fetch for user
        return fetch( PEOPLE_URL + id, {
            method: 'GET',
            headers: jsonHeaders(token.id)
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
