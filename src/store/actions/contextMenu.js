export const createNewTxtFile = data => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(data.files)[Object.keys(data.files).length - 1]);
        data.files[lastValue + 1] = {
            name: 'Text file',
            type: 'txt',
            background: 'http://icons.iconarchive.com/icons/pelfusion/flat-file-type/256/txt-icon.png',
            text: '',
            index: lastValue + 1,
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