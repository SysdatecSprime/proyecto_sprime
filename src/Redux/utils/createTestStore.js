import { combineReducers, createStore } from 'redux';
import auth from '../modules/auth';

export default function createTestStore() {

    const store = createStore(
        combineReducers({
            auth,
        })
    );

    return store;
}
