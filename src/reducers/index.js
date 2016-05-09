import { combineReducers } from 'redux';

import * as people from './people';

export let rootReducer = combineReducers({
    session: people.session,
    //notes: notes.notes,
    //filter: filters.filter,
    //search: filters.search
});
