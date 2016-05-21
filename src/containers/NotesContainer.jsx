import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ACCESS, receive } from '../actions';

import Notes from '../components/Notes';

const mapStateToProps = ( state ) => {
    return {
        ACCESS: state.session.ACCESS
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        verifyAccess: () => {
            let token = window.localStorage.getItem(ACCESS);
            if( token ) {
                token = JSON.parse(token);
                // Set Saved token as session;
                dispatch( receive( ACCESS, token ) );
            } else {
                dispatch(push('/login'));
            }
        }
    }
};

const NotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Notes);

export default NotesContainer;
