import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';

export default class ColorComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            color,
            title,
            size,
            index,
            border,
            active
        } = this.props;

        let borderColor = border ? '2px solid ' + border : '2px solid ' + color;

        const style = {
            border: borderColor,
            backgroundColor: color,
            borderRadius: 15,
            width: 30,
            height: 30,
            margin: 3,
            zIndex: 99 - index
        };

        return (
            <IconButton
                style={style}
                tooltip={ title } />
        );
    }
}
