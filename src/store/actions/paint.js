export const runPaintApplication = runningApps => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(runningApps.active)[Object.keys(runningApps.active).length - 1]);
        runningApps.active[isNaN(lastValue) ? 0 : lastValue + 1] = {
            background: 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/paintcan-512.png',
            name: 'Paint',
            type: 'paint',
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