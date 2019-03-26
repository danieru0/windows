const initState = {
    null: null
}

export default (state = initState, action) => {
    switch(action.type) {
        case 'SAVE_NOTEPAD_TEXT_SUCCESS':
            return {
                ...initState
            }
        default: return initState
    }
}