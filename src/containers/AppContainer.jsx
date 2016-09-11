import React from 'react';
import { push } from 'react-router-redux';

import NewNoteContainer from '../components/Notes/NewNote/NewNoteContainer';
import NotesContainer from '../components/Notes/NotesContainer';
import MenuContainer from '../components/Menu/MenuContainer';

import {
    fetchUserIfNeeded,
} from '../actions';

export default class AppContainer extends React.Component {
    componentDidMount() {
        const { store } = this.context;
        const state = store.getState();

        this.unsuscribe = store.subscribe(() => {
            this.forceUpdate();
        });

        this.verifyAccess(state, store);
        this.getUser(state, store);
    }

    componentWillUpdate() {
        const { store } = this.context;
        const state = store.getState();

        this.verifyAccess(state, store);
        this.getUser(state, store);
    }

    getUser(state, store) {
        if (
            state.session.id &&
            !state.user.id
        ) {
            store.dispatch(
                fetchUserIfNeeded()
            );
        }
    }

    verifyAccess(state, store) {
        if (
            !state.session.id ||
            !state.authorized
        ) {
            this.unsuscribe();
            store.dispatch(push('/login'));
        }
    }

    componentWillUnMount() {
        this.unsuscribe();
    }

    render() {
        return (
            <div>
                <MenuContainer />
                <NewNoteContainer />
                <NotesContainer />
            </div>
        );
    }
}

AppContainer.contextTypes = {
    store: React.PropTypes.object,
};
