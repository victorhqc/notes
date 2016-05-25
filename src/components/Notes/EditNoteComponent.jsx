import React, { Component } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

import EditorComponent from './Editor/EditorComponent';

export default class EditNoteComponent extends Component {

    render() {

        const { title, text } = this.props

        return (
            <div>
                <div className="title-test">
                    <EditorComponent
                        placeholder='Title'
                        text={title}
                        { ...this.props } />
                </div>
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
