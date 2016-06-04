import React, { Component } from 'react';
import { Editor, EditorState, ContentState, convertToRaw } from 'draft-js';
import { convertToHTML } from '../../../helpers/draft-js';

require('draft-js/dist/Draft.css');

export default class EditorComponent extends Component {
    constructor(props) {
        super(props);

        const { text } = props;
        let editorState = (!text || text === '') ? this.createEmpty() : this.createWithText( text );

        this.state = {
            editorState
        };

        this.handleChange = this.handleChange.bind(this);
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

    updateEditor(text) {
        this.handleChange( this.createWithText(text) );
    }

    componentWillUpdate( { text, creating } ) {

        if( !creating && this.props.creating !== creating) {
            return this.setState( { editorState: this.createEmpty() } );
        }

        if( text !== this.props.text ) {
            this.updateEditor(text);
        }
    }

    render() {

        const { placeholder, creating } = this.props;

        return <Editor
            readOnly={ !creating }
            placeholder={ placeholder }
            editorState={ this.state.editorState }
            onChange={ this.handleChange } />;
    }
}
