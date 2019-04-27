import db from '../../indexedDB/db';

export const createNewImageFile = (data, name, base64) => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(data.files)[Object.keys(data.files).length - 1]);
        let index = isNaN(lastValue) ? 0 : lastValue + 1;
        data.files[index] = {
            name: name,
            type: 'image',
            background: 'https://image.flaticon.com/icons/svg/337/337940.svg',
            index: index,
            xPosition: null,
            yPosition: null
        }
        localStorage.setItem('app', JSON.stringify(data));
        dispatch({
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        });
        dispatch(addImageToIndexedDB(name, index, base64));
    }
}

export const addImageToIndexedDB = (name, index, base64) => {
    return dispatch => {
        db.images.add({
            title: name,
            index: index,
            base64: base64
        }).then(() => {
            console.log('added');
        }).catch(err => {
            console.log(err);
        })
    }
}