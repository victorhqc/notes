import React, { Component } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import FlatButton from 'material-ui/FlatButton';

import EditorComponent from './Editor/EditorComponent';

export default class EditNoteComponent extends Component {

    renderTitle( creating, title ) {
        if ( !creating ) { return null; }

        return (
            <div className="title-test">
                <EditorComponent
                    placeholder='Title'
                    text={title}
                    { ...this.props } />
            </div>
        );
    }

    renderDoneButton( creating, closeCreate ) {
        if ( !creating ) { return null; }

        const style = {
            position: 'absolute',
            right: 5,
            bottom: 5
        };

        return (
            <div style={ style }>
                <FlatButton label="Done" onClick={ closeCreate } />
            </div>
        );
    }

    render() {

        const { title, text, creating, closeCreate } = this.props

        return (
            <div>
                { this.renderTitle( creating, title ) }
                <EditorComponent
                    placeholder='Write a note...'
                    text={text}
                    { ...this.props } />
                { this.renderDoneButton( creating, closeCreate ) }
            </div>
        );
    }
}
