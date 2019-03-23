const initState = {
    data: null,
}

export default (state = initState, action) => {
    switch(action.type) {
        case 'GET_LOCAL_STORAGE_SUCCESS':
            return {
                ...state,
                data: action.data
            }
        case 'GET_LOCAL_STORAGE_FAILED':
            return {
                ...state
            }
        default: return state;
    }
}