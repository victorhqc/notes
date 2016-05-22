import React from 'react';
import { push } from 'react-router-redux';

import MenuContainer from '../components/Menu/MenuContainer';

import {
    ACCESS,
    USER,
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
                !state.session.hasOwnProperty(ACCESS) ||
                !state.session.ACCESS.hasOwnProperty('id')
            )
        ) {
            store.dispatch( receive( ACCESS, token ) );
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
            !state.session.hasOwnProperty(USER) ||
            !state.session.USER.hasOwnProperty('id')
        ) {
            store.dispatch( receive( USER, user ) );
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
            </div>
        );
    }
}

AppContainer.contextTypes = {
    store: React.PropTypes.object
};
