import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

export default function EditNoteComponent({
    editor,
    onWrite
}) {
    if( !editor ) {
        onWrite( EditorState.createEmpty() );
        return null;
    }

    return <Editor editorState={editor} onChange={ onWrite } />;
}
