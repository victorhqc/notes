import { ACCESS } from './people';

export function setToken(token) {
    window.localStorage.setItem(ACCESS, JSON.stringify(token));
}

export function getToken() {
    let token = window.localStorage.getItem(ACCESS);
    if( token ) { return JSON.parse(token); }

    return false;
}
