import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchNotes } from '../../actions';

import NotesComponent from './NotesComponent';

const mapStateToProps = ( state ) => {
    return {
        notes: state.notes.notes
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchNotes: () => dispatch( fetchNotes() )
    };
};

const NotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesComponent);

export default NotesContainer;
