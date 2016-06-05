import React from 'react';
import Paper from 'material-ui/Paper';

import ColorComponent from './ColorComponent';

export default function() {
    const colors = [
        { color: '#fff', border: '#ccc', active: '#454545', title: 'None' },
        { color: '#FF8A80', active: '#d66359', title: 'Red' },
        { color: '#FFD180', active: '#FFD180', title: 'Orange' },
        { color: '#FFFF8D', active: '#FFFF8D', title: 'Yellow' },
        { color: '#CFD8DC', active: '#CFD8DC', title: 'Gray' },
        { color: '#80D8FF', active: '#80D8FF', title: 'Blue' },
        { color: '#A7FFEB', active: '#A7FFEB', title: 'Bluish Green'},
        { color: '#CCFF90', active: '#CCFF90', title: 'Green'}
    ];
    const size = 36;
    const width = ( ( colors.length / 2 ) * size );
    const height = 2 * size;

    const style = {
        position: 'absolute',
        top: height - 48,
        left: 48,
        width,
        height,
        zIndex: 99
    };

    return (
        <Paper
            style={style}
            zDepth={1}>
            {colors.map( ( color, index ) =>
                <ColorComponent
                    index={ index }
                    key= { index }
                    size={ size }
                    { ...color } />
            )}
        </Paper>
    );
}
