import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ColorLensIcon from 'material-ui/svg-icons/image/color-lens';

import ColorPalette from './ColorPaletteComponent';

export default class ButtonColorComponent extends Component {
    constructor( props ) {
        super( props );

        this.handleClick = this.handleClick.bind(this);
        this.renderColorPalette = this.renderColorPalette.bind(this);

        this.state = {
            active: false,
            color: '#9197A3'
        };
    }

    handleClick() {
        this.setState({
            active: !this.state.active,
            color: this.state.active ? '#676767' : '#9197A3'
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
                    onClick={ this.handleClick }
                    tooltip="Change color">
                    <ColorLensIcon color={ color }/>
                </IconButton>
                { this.renderColorPalette( active ) }
            </div>
        );
    }
}
