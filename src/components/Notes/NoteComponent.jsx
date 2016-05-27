import React from 'react';
import Paper from 'material-ui/Paper';

const NoteComponent = ({ note }) => {

    const style = {
        minHeight: 50,
        width: '100%',
        margin: 5,
        textAlign: 'left',
        display: 'inline-block',
        padding: 10
    };

    const titleStyle = {
        fontSize: '2em'
    };

    const textStyle = {
        fontSize: (note.title) ? '1em' : '2em'
    };

    return (
        <Paper style={style} zDepth={1}>
            <div style={titleStyle}>
                { note.title }
            </div>
            <div style={textStyle}>
                { note.text }
            </div>
        </Paper>
    );
};

export default NoteComponent;
