export const REQUEST_NOTES = 'REQUEST_NOTES';

export function requestNotes() {
    return {
        type: REQUEST_NOTES,
        requestedAt: Date.now()
    };
}

export const RECEIVE_NOTES = 'RECEIVE_NOTES';

export function receiveNotes(json) {
    return {
        type: RECEIVE_NOTES,
        notes: json.data.map(child => child),
        receivedAt: Date.now()
    };
}

export const FAIL_RECEIVE_NOTES = 'FAIL_RECEIVE_NOTES';

export function failReceiveNotes(json) {
    return {
        type: FAIL_RECEIVE_NOTES,
        error: Object.assign({}, json),
        failedAt: Date.now()
    };
}
