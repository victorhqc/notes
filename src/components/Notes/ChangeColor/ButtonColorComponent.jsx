import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ColorLensIcon from 'material-ui/svg-icons/image/color-lens';

import ColorPalette from './ColorPaletteComponent';

export default class ButtonColorComponent extends Component {
    constructor( props ) {
        super( props );

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.renderColorPalette = this.renderColorPalette.bind(this);

        this.state = {
            active: false,
            color: '#9197A3'
        };
    }

    handleMouseOver() {
        this.setState({
            active: true,
            color: '#676767'
        });
    }

    handleMouseOut() {
        this.setState({
            active: false,
            color: '#9197A3'
        });
    }

    renderColorPalette( active ) {
        if( !active ) { return null; }

        return <ColorPalette />;
    }

    render() {
        const { active, color } = this.state;

        return (
            <div>
                <IconButton
                    onMouseOver={ this.handleMouseOver }
                    onMouseOut={ this.handleMouseOut }
                    tooltip="Change color">
                    <ColorLensIcon color={ color }/>
                </IconButton>
                { this.renderColorPalette( active ) }
            </div>
        );
    }
}
