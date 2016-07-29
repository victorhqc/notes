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

        this.title = props.title || '';
        this.text = props.text || '';

        this.state = {
            creating: props.creating
        };
    }

    componentWillReceiveProps({ creating }) {
        if ( this.state.creating !== creating ) {
            this.setState({ creating });
        }
    }

    /**
     * Receives the title from the EditorComponent. This to avoid using inner state or Redux
     * state, as it would consume a lot of memory.
     * @param  {String} title
     */
    handleTitleChange( title ) {
        this.title = title;
    }

    /**
     * Receives the text from the EditorComponent. This to avoid using inner state or Redux
     * state, as it would consume a lot of memory.
     * @param  {String} text
     */
    handleTextChange( text ) {
        this.text = text;
    }

    /**
     * Handles the Click sent from the parent Component. This to keep separation of concerns,
     * this component is the Editor Only, doesn't care what happens to the text, if is being
     * used to edit or create a Note.
     */
    handleClick() {
        const { handleClick } = this.props;

        handleClick({
            text: this.text,
            title: this.title
        });

        this.text = '';
        this.title = '';
    }

    renderTitle( creating, title ) {
        if ( !creating ) { return null; }

        return (
            <div className='title-test'>
                <EditorComponent
                    { ...this.props }
                    placeholder='Title'
                    change={ this.handleTitleChange }
                    text={ title } />
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
                    text={ text }
                    change={ this.handleTextChange }
                    { ...this.props } />
                { this.renderToolButtons( creating ) }
                { this.renderDoneButton( creating ) }
            </div>
        );
    }
}
