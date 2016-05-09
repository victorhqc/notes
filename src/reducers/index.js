import { combineReducers } from 'redux';

import * as users from './users';

export let rootReducer = combineReducers({
    session: users.session,
    //notes: notes.notes,
    //filter: filters.filter,
    //search: filters.search
});
