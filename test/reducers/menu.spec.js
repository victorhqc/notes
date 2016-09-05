import { assert } from 'chai';
import deepFreeze from 'deep-freeze';

import {
    TOGGLE_MENU,
} from '../../src/actions';

import {
    menu,
} from '../../src/reducers/menu';

/* global it, describe */

describe('Menu Reducer', () => {
    it('Should return the initial state', () => {
        const response = menu(undefined, {});
        assert.deepEqual(response, { visible: false });
    });

    it('Should handle TOGGLE_MENU', () => {
        const nonVisible = {
            visible: false,
        };
        deepFreeze(nonVisible);

        const visible = {
            visible: true,
        };
        deepFreeze(visible);

        // When the menu is not visible, should be visible after.
        const visibleResponse = menu(nonVisible, {
            type: TOGGLE_MENU,
        });
        assert.deepEqual(visible, visibleResponse);

        // When the menu is visible, should not be visible after.
        const nonVisibleResponse = menu(visible, {
            type: TOGGLE_MENU,
        });
        assert.deepEqual(nonVisible, nonVisibleResponse);
    });
});
