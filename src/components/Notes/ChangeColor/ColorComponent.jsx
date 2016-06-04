import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';

export default class ColorComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { color, title, size } = this.props;

        const style = {
            backgroundColor: color,
            boxShadow: '0 3px 10px -5px #333',
            borderRadius: 15,
            width: 30,
            height: 30,
            margin: 3
        };

        return (
            <IconButton
                style={style}
                tooltip={ title } />
        );
    }
}
