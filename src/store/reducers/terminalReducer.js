const initState = {
    output: '',
    refresh: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_OUTPUT':
            return {
                ...state,
                output: action.data,
                refresh: Date.now().toString(36) + Math.random().toString(36).substr(2)
            }
        default: return state;
    }
}