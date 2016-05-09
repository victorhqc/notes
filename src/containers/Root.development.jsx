import React, { Component } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import { fetchAccess, requestAccess } from '../actions';

export default class Root extends Component {
    componentDidMount() {
        const { store } = this.props;

        store.dispatch(fetchAccess('username', 'password'))
        .then(() => {
            console.log('store', store.getState())
        })
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
