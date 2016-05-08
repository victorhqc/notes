import {
    SEARCH_FILTER,
    FILTER_TYPE,
    FILTER_TYPES
} from '../actions';

export function search(state = '', action = {}) {
    switch(action.type) {
        case SEARCH_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export function filter(state = FILTER_TYPES.SHOW_ALL, action = {}) {
    switch(action.type) {
        case FILTER_TYPE:
            return action.filter;
        default:
            return state;
    }
}
