import { connect } from 'react-redux';

import { openCreateNote, closeCreateNote, createNote } from '../../../actions';
import NewNoteComponent from './NewNoteComponent';

const mapStateToProps = (state) => ({
    creating: state.newNote.creating,
    title: state.newNote.title,
    text: state.newNote.text,
    color: state.newNote.color,
});

const mapDispatchToProps = (dispatch) => ({
    openCreate(creating) {
        if (creating) { return; }

        dispatch(openCreateNote());
    },
    closeCreate(creating) {
        if (!creating) { return; }
        dispatch(closeCreateNote());
    },
    addNote(note) {
        dispatch(
           createNote(note)
        );
    },
});

const NewNoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewNoteComponent);

export default NewNoteContainer;
