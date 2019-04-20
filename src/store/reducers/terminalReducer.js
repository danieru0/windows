const initState = {
    output: '',
    refresh: null,
    program: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_OUTPUT':
            return {
                ...state,
                output: action.data,
                refresh: Date.now().toString(36) + Math.random().toString(36).substr(2)
            }
        case 'SET_PROGRAM':
            return {
                ...state,
                program: action.data.program,
                output: action.data.output
            }
        case 'REMOVE_PROGRAM':
            return {
                ...state,
                program: null,
                output: ''
            }
        default: return state;
    }
}