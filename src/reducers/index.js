import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { session } from './session';
import { user } from './user';
import { menu } from './menu';
import { notes, newNote } from './notes';

export let rootReducer = combineReducers({
    session,
    user,
    menu,
    newNote,
    notes,
    routing: routerReducer
});
