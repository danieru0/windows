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
        case 'CREATE_LOCAL_STORAGE_SUCCESS':
            return {
                ...state,
                data: action.data
            }
        default: return state;
    }
}