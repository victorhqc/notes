import React from 'react';
import { push } from 'react-router-redux';

import {
    ACCESS,
    getToken,
    receive
} from '../actions';

export default class AppContainer extends React.Component {
    componentDidMount() {
        const { store } = this.context;
        const state = store.getState();
        this.unsuscribe = store.subscribe(() => {
            this.forceUpdate()
        })

        const token = getToken();
        if( !token ) {
            return store.dispatch(push('/login'));
        }

        if(
            !state.session.hasOwnProperty(ACCESS) ||
            !state.session.ACCESS.hasOwnProperty('id')
        ) {
            store.dispatch( receive( ACCESS, token ) );
        }
    }

    componentDidUpdate() {
        console.log('AHA!!');
    }

    componentWillUnMount() {
        this.unsuscribe();
    }

    render() {
        return (
            <h1>Hello world!</h1>
        );
    }
}

AppContainer.contextTypes = {
    store: React.PropTypes.object
};
