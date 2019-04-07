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
        case 'GET_RUNNING_APPS_SUCCESS':
            return {
                ...state,
                apps: action.data
            }
        case 'ADD_RUNNING_APP_SUCCESS':
            return {
                ...state,
                apps: action.data
            }
        case 'REMOVE_RUNNING_APP_SUCCESS':
            return {
                ...state,
                apps: action.data
            }
        case 'SAVE_RUNNING_APP_POSITION_SUCCESS':
            return {
                ...state,
                apps: action.data
            }
        case 'TOGGLE_MINIMALIZE_APP_SUCCESS':
            return {
                ...state,
                apps: action.data
            }
        case 'CREATE_TXT_FILE_SUCCESS': //From contextMenu.js
            return {
                ...state,
                data: action.data
            }
        case 'CHANGE_APP_NAME_SUCCESS':
            return {
                ...state,
                data: action.data
            }
        case 'REMOVE_FILE_SUCCESS':
            return {
                ...state,
                data: action.data
            }
        default: return state;
    }
}