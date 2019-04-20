import db from '../../indexedDB/db';
import { initLocalStorageJSON } from './localStorage';

export const runSettingsApplication = runningApps => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(runningApps.active)[Object.keys(runningApps.active).length - 1]);
        runningApps.active[isNaN(lastValue) ? 0 : lastValue + 1] = {
            background: 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Settings-5-512.png',
            name: 'Settings',
            type: 'settings',
            index: isNaN(lastValue) ? 0 : lastValue + 1,
            minimalized: false
        }
        localStorage.setItem('running', JSON.stringify(runningApps));
        dispatch({
            type: 'REFRESH_RUNNING_DATA',
            data: JSON.parse(localStorage.getItem('running'))
        })
    }
}

export const changeUserName = username => {
    return dispatch => {
        let app = JSON.parse(localStorage.getItem('app'));
        app.name = username;
        localStorage.setItem('app', JSON.stringify(app));
        dispatch({
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        })
    }
}

export const addNewImage = url => {
    return dispatch => {
        let app = JSON.parse(localStorage.getItem('app'));
        let lastValue = parseInt(Object.keys(app.wallpapers)[Object.keys(app.wallpapers).length - 2]);
        app.wallpapers[isNaN(lastValue) ? 0 : lastValue + 1] = url;
        localStorage.setItem('app', JSON.stringify(app));
        dispatch({
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        })
    }
}

export const removeImage = index => {
    return dispatch => {
        let app = JSON.parse(localStorage.getItem('app'));
        delete app.wallpapers[index];
        localStorage.setItem('app', JSON.stringify(app));
        dispatch({
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        })
    }
}

export const changeWallpaper = wallpaper => {
    return dispatch => {
        let app = JSON.parse(localStorage.getItem('app'));
        app.wallpapers.active = wallpaper;
        localStorage.setItem('app', JSON.stringify(app));
        dispatch({
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        })
    }
}

export const resetFilesPosition = () => {
    return dispatch => {
        let app = JSON.parse(localStorage.getItem('app'));
        Object.keys(app.files).map(item => {
            app.files[item].xPosition = null;
            app.files[item].yPosition = null;
            return null;
        });
        localStorage.setItem('app', JSON.stringify(app));
        dispatch({
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        })
        window.location.reload();
    }
}

export const resetApp = () => {
    return dispatch => {
        dispatch({
            type: 'REFRESH_DATA',
            data: null
        })
        localStorage.removeItem('app');
        localStorage.removeItem('running');
        db.delete().then(() => {
            dispatch(initLocalStorageJSON());
        })
    }
}