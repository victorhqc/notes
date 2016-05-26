import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openCreateNote, closeCreateNote, addNote } from '../../actions';
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
        openCreate: ( creating ) => {
            if( creating ) { return; }

            dispatch( openCreateNote() );
        },
        closeCreate: () => dispatch( closeCreateNote() ),
        addNote: ( note ) => dispatch( addNote(note) )
    };
};

const NewNoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewNoteComponent);

export default NewNoteContainer;
