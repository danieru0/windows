const initState = {
    music: null
}

export default (state = initState, action) => {
    switch(action.type) {
        case 'LOAD_AUDIO':
            return {
                ...initState,
                music: action.audio
            }
        default: return state;
    }
}