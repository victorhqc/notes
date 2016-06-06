import React, { Component } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import FlatButton from 'material-ui/FlatButton';

import EditorComponent from './EditorComponent';
import ButtonColor from '../ChangeColor/ButtonColorComponent';

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

        this.state = {
            creating: props.creating
        };
    }

    componentWillReceiveProps({ creating }) {
        if( this.state.creating !== creating ) {
            this.setState({ creating });
        }
    }

    handleTitleChange( title ) {
        this.title = title;
    }

    handleTextChange( text ) {
        this.text = text;
    }

    handleClick() {
        const {
            userId,
            tokenId,
            closeCreate,
            addNote,
            creating,
            color
        } = this.props;

        // Save the note
        addNote(userId, tokenId, {
            title: this.title,
            text: this.text,
            color: color
        });

        this.text = '';
        this.title = '';

        // Close the editor
        closeCreate( creating );
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

    renderToolButtons( creating ) {
        if( !creating ) { return null; }

        const style = {
            position: 'absolute',
            left: 5,
            bottom: 5
        };

        return (
            <div style={ style }>
                <ButtonColor />
            </div>
        );
    }

    render() {

        const { title, text } = this.props;
        const { creating } = this.state;

        return (
            <div>
                { this.renderTitle( creating, title ) }
                <EditorComponent
                    placeholder='Write a note...'
                    text={text}
                    change={this.handleTextChange}
                    { ...this.props } />
                { this.renderToolButtons( creating ) }
                { this.renderDoneButton( creating ) }
            </div>
        );
    }
}
