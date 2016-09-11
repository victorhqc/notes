// React dependencies
import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import throttle from 'lodash/throttle';

// Redux dependencies
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

// Material UI dependencies
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from './store/configureStore';

import Root from './containers/Root';
import LoginContainer from './containers/LoginContainer';
import AppContainer from './containers/AppContainer';

import { loadState, saveState } from './helpers/localStorage';

require('roboto-fontface/css/roboto-fontface.css');
require('roboto-slab-fontface-kit/roboto-slab.css');
require('material-design-icons/iconfont/material-icons.css');
require('material-icons/css/material-icons.css');
require('skeleton-css/css/normalize.css');
require('skeleton-css/css/skeleton.css');
require('./styles/style.css');

const store = configureStore(loadState());

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 500));

injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={Root}>
                    <IndexRoute component={AppContainer} />
                    <Route path="login" component={LoginContainer} />
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
