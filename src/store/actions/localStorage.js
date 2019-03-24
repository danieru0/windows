export const getLocalStorageJSON = () => {
    return dispatch => {
        let appJSON = JSON.parse(localStorage.getItem('app'));

        if (appJSON) {
            dispatch({
                type: 'GET_LOCAL_STORAGE_SUCCESS',
                data: appJSON
            });
        } else {
            dispatch({
                type: 'GET_LOCAL_STORAGE_FAILED'
            });
            dispatch(initLocalStorageJSON());
        }
    }
}

export const initLocalStorageJSON = () => {
    return dispatch => {
        let appJSON = {
            name: 'Anonymous',
            wallpapers: {
                active: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-633064.jpg',
                0: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-633064.jpg'
            },
            files: {
                0: {
                    name: 'Plik testowy',
                    type: 'txt',
                    background: 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/txt-icon.png',
                    text: 'THIS IS JUST SIMPLE TEXT',
                    xPosition: null,
                    yPosition: null
                },
                1: {
                    name: 'Pliczuś',
                    type: 'txt',
                    background: 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/txt-icon.png',
                    text: 'NOTEPAD :D',
                    xPosition: null,
                    yPosition: null
                }
            }
        } 
        localStorage.setItem('app', JSON.stringify(appJSON));
        dispatch({
            type: 'CREATE_LOCAL_STORAGE_SUCCESS',
            data: JSON.parse(localStorage.getItem('app'))
        });
    }
}

export const saveChanges = data => {
    return dispatch => {
        localStorage.setItem('app', JSON.stringify(data));
    }
}

export const saveFilePosition = (data, xPosition, yPosition, fileIndex) => {
    return dispatch => {
        if (data.files[fileIndex]) {
            data.files[fileIndex].xPosition = xPosition;
            data.files[fileIndex].yPosition = yPosition;
            dispatch(saveChanges(data));
        }
    }
}