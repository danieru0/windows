export const runLinkApplication = (runningApps) => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(runningApps.active)[Object.keys(runningApps.active).length - 1]);
        runningApps.active[isNaN(lastValue) ? 0 : lastValue + 1] = {
            background: 'https://img.icons8.com/flat_round/64/000000/link.png',
            name: 'Link',
            type: 'link',
            index: isNaN(lastValue) ? 0 : lastValue + 1,
            minimalized: false
        }
        localStorage.setItem('running', JSON.stringify(runningApps));
        dispatch({
            type: 'ADD_RUNNING_APP_SUCCESS', //Dispatch to localStorage.js
            data: JSON.parse(localStorage.getItem('running'))
        })
    }
}