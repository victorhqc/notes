import React, { Component } from 'react';
import { push } from 'react-router-redux';
// import { connect } from 'react-redux';

import {
    fetchAccessIfNeeded,
    removeAccess,
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

    componentDidUpdate() {
        const { store } = this.context;
        this.goToRoot(store);
    }

    goToRoot({ dispatch, getState }) {
        const { session, authorized } = getState();

        if (
            !authorized &&
            session.id
        ) {
            return dispatch(removeAccess());
        }

        if (session.id) {
            this.unsuscribe();
            return dispatch(push('/'));
        }

        return null;
    }

    render() {
        const { store } = this.context;

        return (
            <Login
              onRequestLogin={(username, password) => {
                  store.dispatch(fetchAccessIfNeeded(username, password));
              }}
            />
        );
    }
}
LoginContainer.contextTypes = {
    store: React.PropTypes.object,
};
