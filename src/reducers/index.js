import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { session } from './session';
import { user } from './user';
import { menu } from './menu';
import { notes, newNote, editNote } from './notes';

export let rootReducer = combineReducers({
    session,
    user,
    menu,
    newNote,
    editNote,
    notes,
    routing: routerReducer
});
