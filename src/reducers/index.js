import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { session } from './request';

export let rootReducer = combineReducers({
    session,
    routing: routerReducer
});
