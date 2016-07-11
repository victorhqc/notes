import React, { Component } from 'react';
import { push } from 'react-router-redux';
// import { connect } from 'react-redux';

import {
    ACCESS,
    fetchAccessIfNeeded,
    receive,
    removeAccess
} from '../actions';

import Login from '../components/session/Login';

export default class LoginContainer extends Component {
    componentDidMount() {
        const { store } = this.context;
        this.unsuscribe = store.subscribe(() =>
            this.forceUpdate()
        );

        this.goToRoot(store);
    }

    goToRoot(store) {
        const { session, authorized } = store.getState();

        if(
            !authorized &&
            session.hasOwnProperty('id')
        ) {
            return store.dispatch( removeAccess() );
        }

        if( session.hasOwnProperty('id') ) {
            this.unsuscribe();
            return store.dispatch( push('/') );
        }
    }

    componentDidUpdate() {
        const { store } = this.context;
        this.goToRoot(store);
    }

    render() {
        const { store } = this.context;

        return (
            <Login
                onRequestLogin= {( username, password ) => {
                    store.dispatch( fetchAccessIfNeeded( username, password ) );
                }}
            />
        );
    }
}
LoginContainer.contextTypes = {
    store: React.PropTypes.object
}
