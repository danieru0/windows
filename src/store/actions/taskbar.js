export const toggleTaskbarContextMenu = (boolean) => {
    return dispatch => {
        dispatch({
            type: 'TOGGLE_TASKBAR_CONTEXT_MENU_SUCCESS',
            data: boolean
        });
    }
}