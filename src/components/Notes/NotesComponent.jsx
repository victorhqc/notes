import React from 'react';

import NoteComponent from './NoteComponent';

const renderNotes = ( notes ) => {

    return notes.map(( note, i ) => {
        let width = 240;

        let style = {
            position: 'absolute',
            transiton: 'transform',
            transform: `translate(${ (width * i ) + 10 + (10 * i) }px, 0)`,
            width
        };

        return <div key={i} style={ style }>
            <NoteComponent note={note} />
        </div>
    });

};

const NotesComponent = ({ notes }) => {

    const style = {
        marginTop: 20,
        position: 'relative'
    };

    return (
        <div style={ style }>
            { renderNotes( notes ) }
        </div>
    );

};

export default NotesComponent;
