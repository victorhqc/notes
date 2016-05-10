import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccessIfNeeded } from '../actions';

import Login from '../components/session/Login';

const mapStateToProps = ( state ) => {
    return {
        token: state.session.token,
        user: state.session.user
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onRequestLogin: ( username, password ) => {
            dispatch( fetchAccessIfNeeded( username, password ) );
        }
    }
};

const LoginVerifier = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginVerifier;
