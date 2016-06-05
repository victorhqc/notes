import React, { Component } from 'react';

// Material UI Dependencies
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DevTools from './DevTools';
import MenuContainer    from '../components/Menu/MenuContainer';


export default class Root extends Component {

    render() {
        const props = this.props;

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <MenuContainer />
                        { props.children }
                    </div>
                </MuiThemeProvider>
                <DevTools />
            </div>
        );
    }
}
