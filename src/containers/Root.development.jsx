import React, { Component } from 'react';

import DevTools from './DevTools';

export default class Root extends Component {

    render() {
        const props = this.props;

        return (
            <div className="container">
                <DevTools />
                { props.children }
            </div>
        );
    }
}
