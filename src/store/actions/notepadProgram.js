export const saveNotepadState = (runningApps, appIndex, text) => {
    return dispatch => {
        runningApps.active[appIndex].text = text;
        localStorage.setItem('running', JSON.stringify(runningApps));
        dispatch({
            type: 'SAVE_NOTEPAD_TEXT_SUCCESS'
        });
    }
}