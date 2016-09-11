import React, { Component } from 'react';

import LoginComponent from './LoginComponent';
import DevTools from '../Core/DevTools';

export default class Login extends Component {

    render() {
        return (
            <div>
                <LoginComponent {...this.props} />
                <DevTools />
            </div>
        );
    }
}
