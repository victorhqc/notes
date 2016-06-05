require('roboto-fontface/css/roboto-fontface.css');
require('roboto-slab-fontface-kit/roboto-slab.css');
require('material-design-icons/iconfont/material-icons.css');
require('material-icons/css/material-icons.css');
require('skeleton-css/css/normalize.css');
require('skeleton-css/css/skeleton.css');
require('./styles/style.css');

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

import configureStore from './store/configureStore';

import Root from './containers/Root';
import LoginContainer from './containers/LoginContainer';
import AppContainer from './containers/AppContainer';

import { loadState, saveState } from './localStorage';

const store = configureStore( loadState() );

store.subscribe( throttle( () => {
    saveState( store.getState() );
}, 500 ) );

injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
            <Route path="/" component={ Root }>
                <IndexRoute component={ AppContainer }></IndexRoute>
                <Route path="login" component={ LoginContainer }></Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
