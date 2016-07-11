import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { session, authorized } from './session';
import { user } from './user';
import { menu } from './menu';
import { notes, newNote, editNote } from './notes';

export let rootReducer = combineReducers({
    authorized,
    session,
    user,
    menu,
    newNote,
    editNote,
    notes,
    routing: routerReducer
});
