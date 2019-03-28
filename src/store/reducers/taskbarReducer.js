const initState = {
    taskbarContext: false
}

export default (state = initState, action) => {
    switch(action.type) {
        case 'TOGGLE_TASKBAR_CONTEXT_MENU_SUCCESS':
            return {
                ...state,
                taskbarContext: action.data
            }
        default: return state;
    }
}