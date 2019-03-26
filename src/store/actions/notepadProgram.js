export const saveNotepadState = (data, appIndex, text, runningApps) => {
    return dispatch => {
        data.files[appIndex].text = text;
        runningApps.active[appIndex].text = text;
        localStorage.setItem('app', JSON.stringify(data));
        localStorage.setItem('running', JSON.stringify(runningApps));
        dispatch({
            type: 'SAVE_NOTEPAD_TEXT_SUCCESS'
        });
    }
}