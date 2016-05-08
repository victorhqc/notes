export const SEARCH_FILTER = 'SEARCH_FILTER';

export function searchFilter(needle) {
    return {
        type: SEARCH_FILTER,
        filter: needle
    };
}

export const FILTER_TYPE = 'FILTER_TYPE';
export const FILTER_TYPES = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_TEXT: 'SHOW_TEXT',
    SHOW_TODO: 'SHOW_TODO'
};

export function filterType(type) {
    return {
        type: FILTER_TYPE,
        filter: type
    };
}
