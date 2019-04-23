export const createNewTxtFile = data => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(data.files)[Object.keys(data.files).length - 1]);
        data.files[isNaN(lastValue) ? 0 : lastValue + 1] = {
            name: 'Text file',
            type: 'txt',
            background: 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/txt-icon.png',
            text: '',
            index: isNaN(lastValue) ? 0 : lastValue + 1,
            xPosition: null,
            yPosition: null,
            password: null
        }
        localStorage.setItem('app', JSON.stringify(data));
        dispatch({ //Dispatch to localStorage.js
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        })
    }
}