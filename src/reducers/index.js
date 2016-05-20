import { combineReducers } from 'redux';

import { session } from './request';

export let rootReducer = combineReducers({
    session: session
});
