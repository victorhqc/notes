import React from 'react';
import { connect } from 'react-redux';

import { fetchNotes } from '../../actions';

import NotesComponent from './NotesComponent';

const mapStateToProps = ( state ) => ({
    userId: state.user.id,
    tokenId: state.session.id,
    notes: state.notes.notes,
    editingNote: state.editNote
});

const mapDispatchToProps = ( dispatch ) => ({
    fetchNotes(userId, tokenId) {
        dispatch( fetchNotes(userId, tokenId) );
    }
});

const NotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesComponent);

export default NotesContainer;
