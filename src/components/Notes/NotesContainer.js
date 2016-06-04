import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchNotes } from '../../actions';

import NotesComponent from './NotesComponent';

const mapStateToProps = ( state ) => ({
    userId: state.user.id,
    tokenId: state.session.id,
    notes: state.notes.notes
});

const mapDispatchToProps = ( dispatch ) => {
    return {
        fetchNotes: (userId, tokenId) => dispatch(
            fetchNotes(userId, tokenId)
        )
    };
};

const NotesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesComponent);

export default NotesContainer;
