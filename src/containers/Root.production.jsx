import React, { Component } from 'react';

export default class Root extends Component {

    render() {
        const props = this.props;

        return (
            <div className="container">
                { props.children }
            </div>
        );
    }
}
