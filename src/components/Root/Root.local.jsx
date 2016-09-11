import React, { Component } from 'react';

import DevTools from '../Core/DevTools';
import MenuContainer from '../Menu/MenuContainer';

export default class Root extends Component {

    render() {
        const props = this.props;

        return (
            <div>
                <MenuContainer />
                { props.children }
                <DevTools />
            </div>
        );
    }
}
