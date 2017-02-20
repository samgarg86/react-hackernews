import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import rthunk from 'redux-thunk';

const createStoreWithMiddleware = compose(
    applyMiddleware(rthunk)
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}
