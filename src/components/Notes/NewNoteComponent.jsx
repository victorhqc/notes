import React from 'react';
import Paper from 'material-ui/Paper';

import EditNoteComponent from './EditNoteComponent';

export default function NewNoteComponent( props ) {

    const { creating, openCreate } = props;

    const style = {
        marginTop: 30,
        minHeight: creating ? 100 : 50,
        width: '100%',
        textAlign: 'center',
        display: 'inline-block',
        padding: creating ? '15px 15px 50px 15px' : 15,
        position: 'relative'
    };

    const columnStyle = {
        marginLeft: '17.33%'
    };

    return (
        <div className="container">
            <div className="row">
                <div style={columnStyle} className="eight columns">
                    <Paper
                        style={style}
                        zDepth={1}
                        onTouchTap={() => openCreate(creating) }>
                        <EditNoteComponent {...props} />
                    </Paper>
                </div>
            </div>
        </div>
    );
}
