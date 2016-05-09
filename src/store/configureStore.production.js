import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';

const loggerMiddleware = createLogger();

// Middleware you want to use in production:
const enhancer = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
);

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState, enhancer);
}
