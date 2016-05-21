import React, { Component } from 'react';
import { push } from 'react-router-redux';
// import { connect } from 'react-redux';

import {
    ACCESS,
    fetchAccessIfNeeded,
    receive,
    getToken
} from '../actions';

import Login from '../components/session/Login';

/*const mapStateToProps = ( state ) => {
    return {
        ACCESS: state.session.ACCESS
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onRequestLogin: ( username, password ) => {
            dispatch( fetchAccessIfNeeded( username, password ) );
        }
    }
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;*/

export default class LoginContainer extends Component {
    componentDidMount() {
        const { store } = this.context;
        this.unsuscribe = store.subscribe(() => {
            this.forceUpdate()
        })

        this.goToRoot(store);
    }

    goToRoot(store) {
        const token = getToken();

        if( token ) {
            return store.dispatch(push('/'));
        }
    }

    componentDidUpdate() {
        const { store } = this.context;
        this.goToRoot(store);
    }

    componentWillUnMount() {
        this.unsuscribe();
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
