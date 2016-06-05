import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';

export default class ColorComponent extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();

        const { changeColor, color } = this.props;

        changeColor( color );
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
                onClick={ this.handleClick }
                style={ style }
                tooltip={ title } />
        );
    }
}
