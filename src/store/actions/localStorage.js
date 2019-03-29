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
            taskbarContext: false,
            files: {
                0: {
                    name: 'Plik testowy',
                    type: 'txt',
                    background: 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/txt-icon.png',
                    text: 'THIS IS JUST SIMPLE TEXT',
                    index: 0,
                    xPosition: null,
                    yPosition: null
                },
                1: {
                    name: 'Pliczuś',
                    type: 'txt',
                    background: 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/txt-icon.png',
                    text: 'NOTEPAD :D',
                    index: 1,
                    xPosition: null,
                    yPosition: null
                },
                10: {
                    name: 'Youtube link',
                    type: 'link',
                    href: 'https://www.youtube.pl',
                    index: 10,
                    background: 'http://icons.iconarchive.com/icons/danleech/simple/256/youtube-icon.png',
                    xPosition: null,
                    yPosition: null
                }
            }
        } 
        localStorage.setItem('app', JSON.stringify(appJSON));
        let applications = {
            active: {
                0: {
                    name: 'Plik testowy',
                    type: 'txt',
                    background: 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/txt-icon.png',
                    text: 'THIS IS JUST SIMPLE TEXT',
                    index: 0,
                    xPosition: null,
                    yPosition: null
                }
            }
        }
        localStorage.setItem('running', JSON.stringify(applications));
        dispatch({
            type: 'CREATE_LOCAL_STORAGE_SUCCESS',
            data: JSON.parse(localStorage.getItem('app'))
        });
    }
}

export const saveChanges = data => {
    return dispatch => {
        localStorage.setItem('app', JSON.stringify(data));
        dispatch({
            type: 'SAVE_LOCAL_STORAGE_SUCCESS',
            data: data
        })
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

export const getRunningApplications = () => {
    return dispatch => {
        let apps = JSON.parse(localStorage.getItem('running'));
        dispatch({
            type: 'GET_RUNNING_APPS_SUCCESS',
            data: apps
        });
    }
}

export const addRunningAppToLocalStorage = (runningApps, app) => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(runningApps.active)[Object.keys(runningApps.active).length - 1]);
        if (app.index !== lastValue) {
            runningApps.active[app.index] = app;
            runningApps.active[app.index].minimalized = false;
            localStorage.setItem('running', JSON.stringify(runningApps));
            dispatch({
                type: 'ADD_RUNNING_APP_SUCCESS',
                data: JSON.parse(localStorage.getItem('running'))
            });
        } else {
            dispatch(toggleMinimalizeApp(runningApps, app.index));
        }
    }
}

export const removeRunningAppFromLocalStorage = (runningApps, appIndex) => {
    return dispatch => {
        delete runningApps.active[appIndex];
        localStorage.setItem('running', JSON.stringify(runningApps));
        dispatch({
            type: 'REMOVE_RUNNING_APP_SUCCESS',
            data: JSON.parse(localStorage.getItem('running'))
        })
    }
}

export const toggleMinimalizeApp = (runningApps, appIndex) => {
    return dispatch => {
        runningApps.active[appIndex].minimalized = !runningApps.active[appIndex].minimalized;
        localStorage.setItem('running', JSON.stringify(runningApps));
        dispatch({
            type: 'TOGGLE_MINIMALIZE_APP_SUCCESS',
            data: JSON.parse(localStorage.getItem('running'))
        })
    }
}

export const saveProgramPosition = (runningApps, xPosition, yPosition, appIndex) => {
    return dispatch => {
        runningApps.active[appIndex].xPosition = xPosition;
        runningApps.active[appIndex].yPosition = yPosition;
        localStorage.setItem('running', JSON.stringify(runningApps));
        dispatch({
            type: 'SAVE_RUNNING_APP_POSITION_SUCCESS',
            data: runningApps
        });
    }
}

