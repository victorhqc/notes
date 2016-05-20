import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { fetchAccessIfNeeded, fetchCurrentUser } from '../actions';

import LoginVerifier from './LoginVerifier';
import DevTools from './DevTools';

export default class Root extends Component {
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
