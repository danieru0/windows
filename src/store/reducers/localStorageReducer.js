const initState = {
    data: null,
    apps: null
}

export default (state = initState, action) => {
    switch(action.type) {
        case 'REFRESH_DATA':
            return {
                ...state,
                data: action.data
            }
        case 'REFRESH_RUNNING_DATA': {
            return {
                ...state,
                apps: action.data
            }
        }
        case 'GET_LOCAL_STORAGE_FAILED':
            return {
                ...state
            }
        default: return state;
    }
}