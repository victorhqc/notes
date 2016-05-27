import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotesComponent from './NotesComponent';

const mapStateToProps = ( state ) => {
    return {
        notes: state.notes
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {};
};

const NotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesComponent);

export default NotesContainer;
