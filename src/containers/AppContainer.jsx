import React from 'react';
import { push } from 'react-router-redux';

import MenuComponent from '../components/Menu/MenuComponent';

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
            this.forceUpdate();
        });

        const token = getToken();
        if( !token ) {
            this.unsuscribe();
            return store.dispatch(push('/login'));
        }

        if(
            !state.session.hasOwnProperty(ACCESS) ||
            !state.session.ACCESS.hasOwnProperty('id')
        ) {
            store.dispatch( receive( ACCESS, token ) );
        }
    }

    componentWillUnMount() {
        this.unsuscribe();
    }

    render() {
        return (
            <div>
                <MenuComponent />
            </div>
        );
    }
}

AppContainer.contextTypes = {
    store: React.PropTypes.object
};
