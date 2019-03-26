import localStorageReducer from './localStorageReducer';
import notepadReducer from './notepadReducer';

import { combineReducers } from 'redux';

export default combineReducers({
    localStorage: localStorageReducer,
    notepad: notepadReducer
});