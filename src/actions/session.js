import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import {
    jsonHeaders,
    checkStatus,
    parseJSON,
} from '../helpers/fetch';

import {
    request,
    receive,
    failReceive,
    shouldFetch,
} from './requests';

import {
    PEOPLE_URL,
} from './people';

export const REMOVE_ACCESS = 'REMOVE_ACCESS';

export function removeAccess() {
    return {
        type: REMOVE_ACCESS,
    };
}

export function fetchAccess(email, password) {
    return (dispatch) => {
        // Start Login Process
        dispatch(request('session'));

        // Actual login attempt
        return fetch(`${PEOPLE_URL}login`, {
            method: 'POST',
            headers: jsonHeaders(),
            body: JSON.stringify({
                email,
                password,
            }),
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json =>
            dispatch(receive('session', json))
        )
        .catch(err =>
            dispatch(failReceive('session', err))
        );
    };
}

export function fetchAccessIfNeeded(username, password) {
    return (dispatch, getState) => {
        const { session } = getState();
        if (shouldFetch(session)) {
            return dispatch(fetchAccess(username, password));
        }

        return Promise.resolve();
    };
}

export function checkSession() {
    return (dispatch, getState) => {
        const { session, authorized } = getState();

        if (!authorized && session.id) {
            dispatch(removeAccess());
            dispatch(push('/login'));
        }

        return Promise.resolve();
    };
}
