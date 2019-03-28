import localStorageReducer from './localStorageReducer';
import notepadReducer from './notepadReducer';
import taskbarReducer from './taskbarReducer';

import { combineReducers } from 'redux';

export default combineReducers({
    localStorage: localStorageReducer,
    notepad: notepadReducer,
    taskbar: taskbarReducer
});