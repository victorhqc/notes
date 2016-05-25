import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openCreateNote, closeCreateNote, writeNote } from '../../actions';
import NewNoteComponent from './NewNoteComponent';

const mapStateToProps = ( state ) => {

    return {
        creating: state.newNote.creating,
        title: state.newNote.title,
        text: state.newNote.text
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        openCreate: () => dispatch( openCreateNote() ),
        closeCreateNote: () => dispatch( closeCreateNote() ),
        onWrite: (editor) => dispatch( writeNote(editor) )
    };
};

const NewNoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewNoteComponent);

export default NewNoteContainer;
