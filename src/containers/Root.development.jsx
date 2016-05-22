import React, { Component } from 'react';

// Material UI Dependencies
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DevTools from './DevTools';


export default class Root extends Component {

    render() {
        const props = this.props;

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    { props.children }
                </MuiThemeProvider>
                <DevTools />
            </div>
        );
    }
}
