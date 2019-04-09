import db from '../../indexedDB/db';

export const addVideoToIndexedDB = (title, base64) => {
    return dispatch => {
        db.videos.add({
            title: title,
            base64: base64
        }).then(() => {
            console.log('addedd');
        });
    }
}

export const getSpecificVideo = title => {
    return dispatch => {
        db.videos.where('title').equals(title).toArray().then(result => {
            let video = result[0];
            dispatch({
                type: 'LOAD_VIDEO',
                video
            })
        })
    }
}