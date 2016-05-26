import React, { Component } from 'react';
import { Editor, EditorState, ContentState, convertToRaw } from 'draft-js';
import { convertToHTML } from '../../../helpers/draft-js';

require('draft-js/dist/Draft.css');

export default class EditorComponent extends Component {
    constructor(props) {
        super(props);

        const { text } = this.props;
        let editorState = (!text || text === '') ? this.createEmpty() : this.createWithText( text );

        this.state = {
            editorState
        };

        this.handleChange = this.handleChange.bind(this);
        this.close = this.close.bind(this);
    }

    createEmpty() {
        return EditorState.createEmpty();
    }

    createWithText(text) {
        const content = ContentState.createFromText(text);
        return EditorState.createWithContent( content );
    }

    handleChange(editorState) {
        const { change } = this.props;
        const raw = convertToRaw( editorState.getCurrentContent() );

        change( convertToHTML(raw) );

        this.setState({ editorState });
    }

    close() {

    }

    shouldComponentUpdate(newProps, nextState) {
        if(
            //( newProps.text == '' && newProps.creating === true ) ||
            newProps.text !== this.props.text ||
            nextState !== this.state
        ) {
            return true;
        }

        return false;
    }

    updateEditor(text) {
        this.handleChange( this.createWithText(text) );
    }

    componentWillUpdate( { text, creating } ) {
        if( text !== this.props.text && creating ) {
            this.updateEditor(text);
        }
    }

    render() {

        const { placeholder } = this.props;

        return <Editor
            onEscape={ this.close }
            placeholder={ placeholder }
            editorState={ this.state.editorState }
            onChange={ this.handleChange } />;
    }
}
