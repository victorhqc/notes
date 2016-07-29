import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import EditNoteComponent from './Editor/EditNoteComponent';

export default class NoteComponent extends Component {

    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.isEditing = this.isEditing.bind(this);

        this.state = {
            zDepth: 1
        };
    }

    handleMouseOver() {
        this.setState({ zDepth: 2 });
    }

    handleMouseOut() {
        this.setState({ zDepth: 1 });
    }

    isEditing() {
        const { editingNote, note } = this.props;
        return note.id === editingNote.id;
    }

    handleClick() {
        const { editNote, note } = this.props;
        if( this.isEditing() ) { return; }

        editNote( note );
    }

    handleSave() {

    }

    renderReadMode( note ) {
        const { zDepth } = this.state;

        const style = {
            fontFamily: 'Roboto Slab',
            fontWeight: 300,
            minHeight: 50,
            width: '100%',
            margin: 5,
            textAlign: 'left',
            display: 'inline-block',
            padding: 10,
            backgroundColor: note.color || '#fff'
        };

        const titleStyle = {
            fontFamily: 'Roboto',
            fontSize: '0.9em',
            fontWeight: 'bold'
        };

        const textStyle = {
            fontSize: note.text.length < 24 ? '2em' : '1em',
            padding: '15px 5px'
        };

        return (
            <Paper
                style={style}
                zDepth={zDepth}
                onClick={ this.handleClick }
                onMouseOver={ this.handleMouseOver }
                onMouseOut={ this.handleMouseOut }>
                <div style={titleStyle}>
                    { note.title }
                </div>
                <div style={textStyle}>
                    { note.text }
                </div>
            </Paper>
        );
    }

    renderEditMode( note ) {
        const style = {
            fontFamily: 'Roboto Slab',
            fontWeight: 300,
            minHeight: 150,
            width: '100%',
            margin: 5,
            textAlign: 'left',
            display: 'inline-block',
            padding: 10,
            backgroundColor: note.color || '#fff'
        };

        return (
            <Paper
                style={style}>
                <EditNoteComponent
                    handleClick={ this.handleSave.bind(this) }
                    text={ note.text }
                    title={ note.title }
                    creating={ true } />
            </Paper>
        );
    }

    renderNote() {
        const { note } = this.props;
        return this.isEditing() ? this.renderEditMode( note ) : this.renderReadMode( note );
    }

    render() {
        return (
            <div>
                { this.renderNote() }
            </div>
        );
    }
}
