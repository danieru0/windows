const initState = {
    music: {
        title: null,
        base64: null
    }
}

export default (state = initState, action) => {
    switch(action.type) {
        case 'LOAD_AUDIO':
            return {
                ...initState,
                music: {
                    ...initState.music,
                    title: action.audio.title,
                    base64: action.audio.base64
                }
            }
        default: return state;
    }
}