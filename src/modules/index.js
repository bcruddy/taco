import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import counter from './counter';
import crypto from './crypto';

export default combineReducers({
    router: routerReducer,
    counter,
    crypto
});
