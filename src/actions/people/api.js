import fetch from 'isomorphic-fetch';
import {
    JSON_HEADERS,
    checkStatus,
    parseJSON
} from '../../helpers/fetch';

import * as statics from './statics';

let accessToken = '';
export function fetchAccess(username, password) {

    return function(dispatch) {

        // Start Login Process
        dispatch(statics.requestAccess());

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

            dispatch(statics.receiveAccess(json));
        })
        .catch(err =>
            dispatch(statics.failReceiveAccess(err))
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

export function fetchCurrentUser(id) {

    return function(dispatch) {

        // Start Login Process
        dispatch(statics.requestUser());

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
            dispatch(statics.receiveUser(json))
        )
        .catch(err =>
            dispatch(statics.failReceiveUser(err))
        );
    };
}
