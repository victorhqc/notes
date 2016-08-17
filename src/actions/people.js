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

import { url } from 'api';

export const PEOPLE_URL = url + 'people/';
export const USER = 'USER';

export function fetchUserIfNeeded() {

    return (dispatch, getState) => {
        const { user, session, isFetching } = getState();

        if( shouldFetch( user, isFetching ) ) {
            return dispatch(
                fetchCurrentUser( session.userId, session.id )
            );
        }else {
            return Promise.resolve();
        }
    };
}

export function fetchCurrentUser(userId, tokenId) {

    return function(dispatch) {

        // Start Login Process
        dispatch(request('user'));

        // Actual Fetch for user
        return fetch( PEOPLE_URL + userId, {
            method: 'GET',
            headers: jsonHeaders(tokenId)
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json =>
            dispatch(receive('user', json))
        )
        .catch(err =>
            dispatch(failReceive('user', err))
        );
    };
}
