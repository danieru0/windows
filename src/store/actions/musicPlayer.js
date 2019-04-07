export const createNewAudioFile = (data, name, base64) => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(data.files)[Object.keys(data.files).length - 1]);
        let index = isNaN(lastValue) ? 0 : lastValue + 1;
        data.files[lastValue + 1] = {
            name: name,
            type: 'audio',
            background: 'https://image.flaticon.com/icons/svg/337/337944.svg',
            index: index,
            xPosition: null,
            yPosition: null
        }
        localStorage.setItem('app', JSON.stringify(data));
        dispatch({
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        });
        dispatch(addAudioToLocalStorage(index, base64))
    }
}

export const addAudioToLocalStorage = (index, base64) => {
    return dispatch => {
        let audio = JSON.parse(localStorage.getItem('audio'));
        audio[index] = base64;
        localStorage.setItem('audio', JSON.stringify(audio)); 
    }
}