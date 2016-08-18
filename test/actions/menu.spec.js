import { assert } from 'chai';
import deepFreeze from 'deep-freeze';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import {
    TOGGLE_MENU,
    toggleMenu
} from '../../src/actions/menu';

describe('Menu Actions', function() {

    it ('Should Toggle the Menu', () => {
        const expectedAction = {
            type: TOGGLE_MENU
        };

        assert.deepEqual( toggleMenu(), expectedAction );
    });
});
