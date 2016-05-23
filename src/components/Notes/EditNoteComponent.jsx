import React, { Component } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

export default class EditNoteComponent extends Component {
    constructor(props) {
        super(props);

        const { text } = this.props;
        const content = ContentState.createFromText(text);

        this.state = { editorState: EditorState.createWithContent( content ) };
        this.onChange = (editorState) => this.setState({editorState});
    }

    shouldComponentUpdate(newProps, nextState) {
        if(
            newProps.text !== this.props.text ||
            nextState !== this.state
        ) {
            return true;
        }

        return false;
    }

    updateEditor(text) {
        const content = ContentState.createFromText(text);

        window.setTimeout(
            () => this.onChange(EditorState.createWithContent( content ) ),
            10
        );
    }

    componentWillUpdate( { text, creating } ) {
        if( text !== this.props.text && creating ) {
            this.updateEditor(text);
        }
    }

    render() {
        return <Editor
            editorState={ this.state.editorState }
            onChange={ this.onChange } />;
    }
}

/*export default function EditNoteComponent({
    editor,
    onWrite
}) {
    if( !editor ) {
        onWrite( EditorState.createEmpty() );
        return null;
    }

    return <Editor editorState={editor} onChange={ onWrite } />;
}*/
