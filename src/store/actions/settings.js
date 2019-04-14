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
            type: 'REFRESH_RUNNING_DATA', //Dispatch to localStorage.js
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