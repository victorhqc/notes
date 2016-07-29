import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import EditNoteComponent from '../Editor/EditNoteComponent';

export default class NewNoteComponent extends Component {
    constructor(props) {
        super(props);

        this.handleEscPress = this.handleEscPress.bind(this);
        //this.handleClick = this.handleClick.bind(this);
    }

    handleEscPress({ keyCode }) {

        // Esc Key
        if ( keyCode === 27) {
            const { closeCreate, creating } = this.props;

            closeCreate(creating);
        }
    }

    handleClick({ title, text }) {
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
            title,
            text,
            color
        });

        // Close the editor
        closeCreate( creating );
    }

    render() {
        const { creating, openCreate, color } = this.props;

        const style = {
            marginTop: 30,
            minHeight: creating ? 100 : 50,
            width: '100%',
            textAlign: 'center',
            display: 'inline-block',
            padding: creating ? '15px 15px 50px 15px' : 15,
            position: 'relative',
            backgroundColor: !creating ? '#fff' : color
        };

        const columnStyle = {
            marginLeft: '17.33%'
        };

        return (
            <div className="container">
                <div className="row">
                    <div style={ columnStyle } className="eight columns">
                        <Paper
                            onKeyDown={ this.handleEscPress }
                            style={ style }
                            zDepth={ 1 }
                            onTouchTap={() => openCreate( creating ) }>
                            <EditNoteComponent
                                handleClick={ this.handleClick.bind(this) }
                                { ...this.props } />
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}
