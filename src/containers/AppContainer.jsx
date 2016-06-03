import React    from 'react';
import { push } from 'react-router-redux';

import MenuContainer    from '../components/Menu/MenuContainer';
import NewNoteContainer from '../components/Notes/NewNoteContainer';
import NotesContainer   from '../components/Notes/NotesContainer';

import {
    setAccess,
    getToken,
    receive,
    getUser,
    fetchUserIfNeeded
} from '../actions';

export default class AppContainer extends React.Component {
    componentDidMount() {
        const { store } = this.context;
        const state = store.getState();

        this.unsuscribe = store.subscribe(() => {
            this.forceUpdate();
        });

        const token = this.verifyAccess(store);

        if(
            token && (
                !state.session.token ||
                !state.session.token.hasOwnProperty('id')
            )
        ) {
            store.dispatch( setAccess( token ) );
        }
    }

    verifyAccess(store) {
        const token = getToken();
        if( !token ) {
            this.unsuscribe();
            store.dispatch(push('/login'));
        }

        return token;
    }

    getUser(store) {
        const state = store.getState();
        const user = getUser();
        if( !user ) {
            store.dispatch(
                fetchUserIfNeeded()
            );
        } else if(
            !state.user ||
            !state.user.hasOwnProperty('id')
        ) {
            store.dispatch( receive( 'user', user ) );
        }
    }

    componentWillUpdate() {
        const { store } = this.context;
        this.verifyAccess(store);
        this.getUser(store);
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
