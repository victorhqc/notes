import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openCreateNote, closeCreateNote, createNote } from '../../actions';
import NewNoteComponent from './NewNoteComponent';

const mapStateToProps = ( state ) => ({
    userId: state.user.id,
    tokenId: state.session.id,
    creating: state.newNote.creating,
    title: state.newNote.title,
    text: state.newNote.text
});

const mapDispatchToProps = ( dispatch ) => {
    return {
        openCreate: ( creating ) => {
            if( creating ) { return; }

            dispatch( openCreateNote() );
        },
        closeCreate: () => dispatch( closeCreateNote() ),
        addNote: ( userId, tokenId, note ) => dispatch(
            createNote(userId, tokenId, note)
        )
    };
};

const NewNoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewNoteComponent);

export default NewNoteContainer;
