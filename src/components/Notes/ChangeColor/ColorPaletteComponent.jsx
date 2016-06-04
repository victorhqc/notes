import React from 'react';

import ColorComponent from './ColorComponent';

export default function() {
    const colors = [
        { color: '#fff', title: 'None' },
        { color: '#FF8A80', title: 'Red' },
        { color: '#FFD180', title: 'Orange' },
        { color: '#FFFF8D', title: 'Yellow' },
        { color: '#CFD8DC', title: 'Gray' },
        { color: '#80D8FF', title: 'Blue' },
        { color: '#A7FFEB', title: 'Bluish Green'},
        { color: '#CCFF90', title: 'Green'}
    ];

    const padding = 10;
    const size = 15;

    const style = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: ( ( colors.length / 2 ) * size ) + padding,
        height: 2 * size + padding
    };

    return (
        <div style={ style }>
            {colors.map( ( { color, title }, index ) =>
                <ColorComponent
                    key= { index }
                    size={ size }
                    color={ color }
                    title={ title } />
            )}
        </div>
    );
}
