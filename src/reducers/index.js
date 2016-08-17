import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { isFetching } from './request';
import { session, authorized } from './session';
import { user } from './user';
import { menu } from './menu';
import { notes, newNote, editNote } from './notes';

export let rootReducer = combineReducers({
    isFetching,
    authorized,
    session,
    user,
    menu,
    newNote,
    editNote,
    notes,
    routing: routerReducer
});
