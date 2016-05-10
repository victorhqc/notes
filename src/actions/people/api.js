import fetch from 'isomorphic-fetch';
import {
    JSON_HEADERS,
    checkStatus,
    parseJSON
} from '../../helpers/fetch';

import * as statics from './statics';

import { url } from 'api';
const peopleUrl = url + 'people/';

let accessToken = '';
export function fetchAccess(username, password) {

    return function(dispatch) {

        // Start Login Process
        dispatch(statics.requestAccess());

        // Actual login attempt
        return fetch( peopleUrl + '/login', {
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

            dispatch(statics.receiveAccess(json));
        })
        .catch(err =>
            dispatch(statics.failReceiveAccess(err))
        );
    };
}

export function shouldFetchSession(state) {
    const session = state.session;
    if( !session.token || !session.token.isFetching ) {
        return true;
    } else if( session.token.isFetching ) {
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

export function fetchCurrentUser(id) {

    return function(dispatch) {

        // Start Login Process
        dispatch(statics.requestUser());

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
            dispatch(statics.receiveUser(json))
        )
        .catch(err =>
            dispatch(statics.failReceiveUser(err))
        );
    };
}
