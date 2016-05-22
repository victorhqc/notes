import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { session } from './request';
import { menu } from './menu';

export let rootReducer = combineReducers({
    session,
    menu,
    routing: routerReducer
});
