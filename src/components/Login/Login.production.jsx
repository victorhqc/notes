import React, { Component } from 'react';

import LoginComponent from './LoginComponent';

export default class Login extends Component {

    render() {
        return (
            <div>
                <LoginComponent {...this.props} />
            </div>
        );
    }
}
