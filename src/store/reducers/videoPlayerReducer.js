const initState = {
    video: {
        title: null,
        base64: null
    }
}

export default (state = initState, action) => {
    switch(action.type) {
        case 'LOAD_VIDEO':
            return {
                ...initState,
                video: {
                    ...initState.video,
                    title: action.video.title,
                    base64: action.video.base64
                }
            }
        default: return state;
    }
}