export const runTerminalApplication = runningApps => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(runningApps.active)[Object.keys(runningApps.active).length - 1]);
        runningApps.active[isNaN(lastValue) ? 0 : lastValue + 1] = {
            background: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/terminal-512.png',
            name: 'Terminal',
            type: 'terminal',
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

export const help = () => {
    return dispatch => {
        let output = `
            <p>echo</p>
            <p>cls</p>
            <p>calculator</p>
            <p>author</p>
            <p><br /></p>
        `
        dispatch({
            type: 'UPDATE_OUTPUT',
            data: output
        })
    }
}

export const echo = (inProgram, value) => {
    return dispatch => {
        let text = value.replace('echo', '');
        let output = `
            <p>${text}</p>
            <p><br /></p>
        `
        dispatch({
            type: 'UPDATE_OUTPUT',
            data: output
        })
    }
}

export const author = () => {
    return dispatch => {
        let output = `
            <p>Daniel Dąbrowski</p>
            <p>www.github.com/elosiktv</p>
            <p><br /></p>
        `
        dispatch({
            type: 'UPDATE_OUTPUT',
            data: output
        })
    }
}

export const calculator = (inProgram, value) => {
    return dispatch => {
        if (!inProgram) {
            dispatch({
                type: 'SET_PROGRAM',
                data: {program: 'calculator', output: `<p>Type 'exit' to stop calculator</p>`}
            });
        } else {
            if (value.match(/^[0-9/\W/]+$/)) {
                dispatch({
                    type: 'UPDATE_OUTPUT',
                    // eslint-disable-next-line
                    data: `<p>${eval(value)}</p>`
                })
            } else {
                if (value === 'exit') {
                    dispatch({
                        type: 'REMOVE_PROGRAM'
                    })
                }
            }
        }
    }
}