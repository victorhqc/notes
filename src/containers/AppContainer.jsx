import React from 'react';
import { push } from 'react-router-redux';

import MenuContainer from '../components/Menu/MenuContainer';

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

        const token = this.verifyAccess();

        if(
            token && (
                !state.session.hasOwnProperty(ACCESS) ||
                !state.session.ACCESS.hasOwnProperty('id')
            )
        ) {
            store.dispatch( receive( ACCESS, token ) );
        }
    }

    verifyAccess() {
        const { store } = this.context;
        const token = getToken();
        if( !token ) {
            this.unsuscribe();
            store.dispatch(push('/login'));
        }

        return token;
    }

    componentWillUpdate() {
        this.verifyAccess();
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
