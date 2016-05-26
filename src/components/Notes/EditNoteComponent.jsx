import React, { Component } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import FlatButton from 'material-ui/FlatButton';

import EditorComponent from './Editor/EditorComponent';

export default class EditNoteComponent extends Component {

    constructor( props ) {
        super(props);

        this.renderTitle = this.renderTitle.bind(this);
        this.renderDoneButton = this.renderDoneButton.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);

        this.title = '';
        this.text = '';
    }

    handleTitleChange( title ) {
        this.title = title;
    }

    handleTextChange( text ) {
        this.text = text;
    }

    handleClick() {
        const { closeCreate, addNote } = this.props;

        // Save the note
        addNote({
            title: this.title,
            text: this.text
        });

        // Close the editor
        closeCreate();
    }

    renderTitle( creating, title ) {
        if ( !creating ) { return null; }

        return (
            <div className="title-test">
                <EditorComponent
                    placeholder='Title'
                    change={this.handleTitleChange}
                    text={title}
                    { ...this.props } />
            </div>
        );
    }

    renderDoneButton( creating ) {
        if ( !creating ) { return null; }

        const style = {
            position: 'absolute',
            right: 5,
            bottom: 5
        };

        return (
            <div style={ style }>
                <FlatButton label="Done" onClick={ this.handleClick } />
            </div>
        );
    }

    render() {

        const { title, text, creating } = this.props

        return (
            <div>
                { this.renderTitle( creating, title ) }
                <EditorComponent
                    placeholder='Write a note...'
                    text={text}
                    change={this.handleTextChange}
                    { ...this.props } />
                { this.renderDoneButton( creating ) }
            </div>
        );
    }
}
