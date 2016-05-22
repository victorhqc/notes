import {
    TOGGLE_MENU
} from '../actions';

export function menu( state = {
    visible: false
}, action = {} ) {
    switch(action.type) {
        case TOGGLE_MENU:
            return Object.assign({}, state, {
                visible: !state.visible
            });
        default:
            return state;
    }
}
