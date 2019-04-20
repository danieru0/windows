import { removeFile } from './localStorage';

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
            <p>> help</p>
            <p>echo</p>
            <p>cls</p>
            <p>calculator</p>
            <p>author</p>
            <p>touch</p>
            <p>exit</p>
            <p>whoami</p>
            <p>ls</p>
            <p>rm</p>
            <p>href</p>
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
            <p>> echo ${text}</p>
            <p>${text}</p>
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
            <p>> author</p>
            <p>Daniel Dąbrowski</p>
            <p>www.github.com/elosiktv</p>
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
                data: {program: 'calculator', output: `<p>> calculator</p><p>Type 'stop' to stop calculator</p>`}
            });
        } else {
            if (value.match(/^[0-9/\W/]+$/)) {
                dispatch({
                    type: 'UPDATE_OUTPUT',
                    // eslint-disable-next-line
                    data: `<p>calculator> ${value}</p><p>${eval(value)}</p>`
                })
            } else {
                if (value === 'stop') {
                    dispatch({
                        type: 'REMOVE_PROGRAM',
                        data: `<p>calculator> stop</p>`
                    })
                }
            }
        }
    }
}

export const touch = (inProgram, value) => {
    return dispatch => {
        let name = value.replace('touch', '');
        if (name) {
            let app = JSON.parse(localStorage.getItem('app'));
            let lastValue = parseInt(Object.keys(app.files)[Object.keys(app.files).length - 1]);
            app.files[isNaN(lastValue) ? 0 : lastValue + 1] = {
                name: name,
                type: 'txt',
                background: 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/txt-icon.png',
                text: '',
                index: isNaN(lastValue) ? 0 : lastValue + 1,
                xPosition: null,
                yPosition: null
            }
            localStorage.setItem('app', JSON.stringify(app));
            dispatch({
                type: 'REFRESH_DATA',
                data: JSON.parse(localStorage.getItem('app'))
            })
            dispatch({
                type: 'UPDATE_OUTPUT',
                data: `<p>> touch ${name}</p><p>Created txt file with name: ${name}</p>`
            })
        } else {
            dispatch({
                type: 'UPDATE_OUTPUT',
                data: `<p>> touch</p><p>Correct syntax: touch "file name"</p>`
            })
        }
    }
}

export const whoami = () => {
    return dispatch => {
        let app = JSON.parse(localStorage.getItem('app'));
        dispatch({
            type: 'UPDATE_OUTPUT',
            data: `<p>> whoami</p><p>${app.name}</p>`
        })
    }
}

export const ls = () => {
    return dispatch => {
        let app = JSON.parse(localStorage.getItem('app'));
        let output;
        Object.keys(app.files).map(item => {
            output += `<p>${item} ${app.files[item].name}.${app.files[item].type}</p>`
            return null;
        })
        dispatch({
            type: 'UPDATE_OUTPUT',
            data: `<p>> ls</p><p>${output.replace('undefined', '')}</p>`
        })
    }
}

export const rm = (inProgram, value) => {
    return dispatch => {
        let index = value.replace('rm', '');
        if (index) {
            let app = JSON.parse(localStorage.getItem('app'));
            dispatch(removeFile(app, parseInt(index)));
            dispatch({
                type: 'UPDATE_OUTPUT',
                data: `<p>> rm ${index}</p><p>file with index ${index} has been deleted</p>`
            })
        } else {
            dispatch({
                type: 'UPDATE_OUTPUT',
                data: `<p>> rm</p><p>Correct syntax: rm "file index"</p>Use 'ls' to get file index<p></p>`
            })
        }
    }
}

export const href = (inProgram, value) => {
    return dispatch => {
        let site = value.replace('href', '');
        if (site) {
            if (!(site.indexOf('http') > -1 || site.indexOf('https') > -1)) {
                window.open(`https://${site.replace(/ /g, '')}`);
            } else {
                window.open(site);
            }
        } else {
            dispatch({
                type: 'UPDATE_OUTPUT',
                data: `<p>> href</p><p>Correct syntax: href "url"</p>`
            })
        }
    }
}