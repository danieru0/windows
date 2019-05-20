export const runLinkApplication = runningApps => {
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
            type: 'REFRESH_RUNNING_DATA', //Dispatch to localStorage.js
            data: JSON.parse(localStorage.getItem('running'))
        })
    }
}

export const createNewLinkFile = (data, link, icon) => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(data.files)[Object.keys(data.files).length - 1]);
        data.files[isNaN(lastValue) ? 0 : lastValue + 1] = {
            name: 'Link file',
            type: 'link',
            background: icon ? icon : 'https://img.icons8.com/flat_round/64/000000/link.png',
            index: isNaN(lastValue) ? 0 : lastValue + 1,
            href: link,
            xPosition: null,
            yPosition: null
        }
        localStorage.setItem('app', JSON.stringify(data));
        dispatch({ //Dispatch to localStorage.js
            type: 'CREATE_TXT_FILE_SUCCESS',
            data: JSON.parse(localStorage.getItem('app'))
        }) 
    }
}