import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { fetchAccessIfNeeded, fetchCurrentUser } from '../actions';

import LoginVerifier from './LoginVerifier';
import DevTools from './DevTools';

export default class Root extends Component {
    componentDidMount() {
        /*store.dispatch(fetchAccessIfNeeded('username', 'password'))
        .then(() =>  {
            let state = store.getState(),
                userId = state.session.token.userId;
            return store.dispatch(fetchCurrentUser(userId));
        });*/
    }

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <div className="container">
                    <LoginVerifier />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}
