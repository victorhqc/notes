import React from 'react';

import NoteComponent from './NoteComponent';

const renderNotes = (notes) => {

    return notes.map(( note, i ) =>
        <div className="four columns" key={i}>
            <NoteComponent note={note} />
        </div>
    );

};

const NotesComponent = ({ notes }) => {

    const style = {
        marginTop: 20
    };

    return (
        <div className="container" style={style}>
            <div class="row">
                { renderNotes(notes) }
            </div>
        </div>
    );

};

export default NotesComponent;
