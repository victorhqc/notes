import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import { fetchAccessIfNeeded, fetchCurrentUser } from '../actions';

export default class Root extends Component {
    componentDidMount() {
        const { store } = this.props;

        store.dispatch(fetchAccessIfNeeded('username', 'password'))
        .then(() =>  {
            let state = store.getState(),
                userId = state.session.token.userId;
            return store.dispatch(fetchCurrentUser(userId));
        });
    }

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <div>
                    <DevTools />
                </div>
            </Provider>
        );
    }
}
