import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';

export default class ColorComponent extends Component {

    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.state = {
            active: false
        };
    }

    handleMouseOver() {
        this.setState({
            active: true
        });
    }

    handleMouseOut() {
        this.setState({
            active: false
        });
    }

    render() {
        const { color, title, size } = this.props;

        return (
            <IconButton
                mouseOver={ this.handleMouseOver }
                mouseOut={ this.handleMouseOut }
                tooltip={ title } />
        );
    }
}
