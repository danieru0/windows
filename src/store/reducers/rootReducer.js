import localStorageReducer from './localStorageReducer';

import { combineReducers } from 'redux';

export default combineReducers({
    localStorage: localStorageReducer
});