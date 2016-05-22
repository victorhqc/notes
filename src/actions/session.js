import { ACCESS, USER } from './people';

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

export function setUser(json) {
    window.localStorage.setItem(USER, JSON.stringify(json));
}

export function getUser() {
    let user = window.localStorage.getItem(USER);
    if( user ) { return JSON.parse(user); }

    return false;
}
