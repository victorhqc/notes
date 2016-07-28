import React, { Component } from 'react';

// Material UI Dependencies
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Root extends Component {

    render() {
        const props = this.props;

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    { props.children }
                </MuiThemeProvider>
            </div>
        );
    }
}
