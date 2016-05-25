import React, { Component } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

import EditorComponent from './Editor/EditorComponent';

export default class EditNoteComponent extends Component {

    renderTitle(creating, title) {
        if (!creating) { return null; }

        return (
            <div className="title-test">
                <EditorComponent
                    placeholder='Title'
                    text={title}
                    { ...this.props } />
            </div>
        );
    }

    render() {

        console.log('props', this.props);
        const { title, text, creating } = this.props

        return (
            <div>
                { this.renderTitle(creating, title) }
                <EditorComponent
                    placeholder='Write a note...'
                    text={text}
                    { ...this.props } />
            </div>
        );
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
