import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editNote } from '../../actions';

import NoteComponent from './NoteComponent';

const mapStateToProps = ( state ) => ({});

const mapDispatchToProps = ( dispatch ) => ({
    editNote(note) {
        dispatch( editNote( note ) );
    }
});

const NoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteComponent);

export default NoteContainer;
