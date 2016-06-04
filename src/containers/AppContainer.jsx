import React    from 'react';
import { push } from 'react-router-redux';

import MenuContainer    from '../components/Menu/MenuContainer';
import NewNoteContainer from '../components/Notes/NewNoteContainer';
import NotesContainer   from '../components/Notes/NotesContainer';

import {
    setAccess,
    receive,
    fetchUserIfNeeded
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

    verifyAccess(state, store) {
        if( ! state.session.hasOwnProperty('id') ) {
            this.unsuscribe();
            store.dispatch(push('/login'));
        }
    }

    getUser(state, store) {

        if(
            state.session.hasOwnProperty('id') &&
            !state.user.hasOwnProperty('id')
        ) {
            store.dispatch(
                fetchUserIfNeeded()
            );
        }
    }

    componentWillUpdate() {
        const { store } = this.context;
        const state = store.getState();

        this.verifyAccess(state, store);
        this.getUser(state, store);
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
    store: React.PropTypes.object
};
