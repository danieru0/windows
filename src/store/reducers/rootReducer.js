import localStorageReducer from './localStorageReducer';
import notepadReducer from './notepadReducer';
import taskbarReducer from './taskbarReducer';
import videoPlayerReducer from './videoPlayerReducer';

import { combineReducers } from 'redux';

export default combineReducers({
    localStorage: localStorageReducer,
    notepad: notepadReducer,
    taskbar: taskbarReducer,
    videoPlayer: videoPlayerReducer
});