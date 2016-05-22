import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleCreateNote, writeNote } from '../../actions';
import NewNoteComponent from './NewNoteComponent';

const mapStateToProps = ( state ) => {

    return {
        creating: state.newNote.creating,
        editor: state.newNote.editor
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        toggleCreate: () => dispatch( toggleCreateNote() ),
        onWrite: (editor) => {

            console.log('editor', editor);
            dispatch( writeNote(editor) )
        }
    };
};

const NewNoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewNoteComponent);

export default NewNoteContainer;
