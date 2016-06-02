export const JSON_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export function jsonHeaders(token) {
    let headers = JSON_HEADERS;
    if(token) {
        headers.Authorization = token;
    }

    return headers;
}

export function checkStatus(response) {
    if(response.status >= 200 && response.status < 300) {
        return response;
    }

    var error = new Error(response.statusText);
    error.response = response;

    throw error;
}

export function parseJSON(response) {
    return response.json();
}
