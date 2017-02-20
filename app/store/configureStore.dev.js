import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import rthunk from 'redux-thunk';

const createStoreWithMiddleware = compose(
    applyMiddleware(rthunk),
    DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}
