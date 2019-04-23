import db from '../../indexedDB/db';

export const createNewVideoFile = (data, title, base64) => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(data.files)[Object.keys(data.files).length - 1]);
        let index = isNaN(lastValue) ? 0 : lastValue + 1;
        data.files[isNaN(lastValue) ? 0 : lastValue + 1] = {
            name: title,
            type: 'video',
            background: 'https://cdn0.iconfinder.com/data/icons/file-names-26/512/23-512.png',
            index: index,
            xPosition: null,
            yPosition: null
        }
        localStorage.setItem('app', JSON.stringify(data));
        dispatch({
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        });
        dispatch(addVideoToIndexedDB(title, index, base64, data));
    }
}

export const addVideoToIndexedDB = (title, index, base64, data) => {
    return dispatch => {
        db.videos.add({
            title: title,
            index: index,
            base64: base64
        }).then(() => {
            console.log('added');
        }).catch(err => {
            console.log(err);
        })
    }
}

export const getSpecificVideo = index => {
    return dispatch => {
        db.videos.where('index').equals(index).toArray().then(result => {
            let video = result[0];
            dispatch({
                type: 'LOAD_VIDEO',
                video
            })
        })
    }
}

export const clearVideoReducer = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_DATA'
        });
    }
}