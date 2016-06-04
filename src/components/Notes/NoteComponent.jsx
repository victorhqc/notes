import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

export default class NoteComponent extends Component {

    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.state = {
            zDepth: 1
        };
    }

    handleMouseOver() {
        this.setState({ zDepth: 2 });
    }

    handleMouseOut() {
        this.setState({ zDepth: 1 });
    }

    render() {
        const { note } = this.props;
        const { zDepth } = this.state;

        const style = {
            minHeight: 50,
            width: '100%',
            margin: 5,
            textAlign: 'left',
            display: 'inline-block',
            padding: 10
        };

        const titleStyle = {
            fontSize: '2em'
        };

        const textStyle = {
            fontSize: (
                note.title ||
                note.text.length >= 24
            ) ? '1em' : '2em'
        };

        return (
            <Paper
                style={style}
                zDepth={zDepth}
                onMouseOver={ this.handleMouseOver }
                onMouseOut={ this.handleMouseOut }>
                <div style={titleStyle}>
                    { note.title }
                </div>
                <div style={textStyle}>
                    { note.text }
                </div>
            </Paper>
        );
    }
}
