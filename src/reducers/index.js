import { combineReducers } from 'redux';

import * as filters from 'filters';
import * as notes from 'notes';

export let rootReducer = combineReducers({
    notes: notes.notes,
    filter: filters.filter,
    search: filters.search
});
