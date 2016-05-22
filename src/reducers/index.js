import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { session } from './request';
import { menu } from './menu';
import { notes, newNote } from './notes';

export let rootReducer = combineReducers({
    session,
    menu,
    newNote,
    notes,
    routing: routerReducer
});
