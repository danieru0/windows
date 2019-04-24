import db from '../../indexedDB/db';

export const createNewAudioFile = (data, name, base64) => {
    return dispatch => {
        let lastValue = parseInt(Object.keys(data.files)[Object.keys(data.files).length - 1]);
        let index = isNaN(lastValue) ? 0 : lastValue + 1;
        data.files[index] = {
            name: name,
            type: 'audio',
            background: 'https://image.flaticon.com/icons/svg/337/337944.svg',
            image: 'https://images-na.ssl-images-amazon.com/images/I/61R7gJadP7L._SX466_.jpg',
            index: index,
            xPosition: null,
            yPosition: null
        }
        localStorage.setItem('app', JSON.stringify(data));
        dispatch({
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        });
        dispatch(addAudioToIndexedDB(name, index, base64))
    }
}

export const addAudioToIndexedDB = (name, index, base64) => {
    return dispatch => {
        db.audios.add({
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

export const getSpecificMusic = index => {
    return dispatch => {
        db.audios.where('index').equals(index).toArray().then(result => {
            let audio = result[0];
            dispatch({
                type: 'LOAD_AUDIO',
                audio
            })
        })
    }
}

export const loadNewMusic = (activePlayer, clickedMusic, xPosition, yPosition) => {
    return dispatch =>   {
        let running = JSON.parse(localStorage.getItem('running'));
        let app = JSON.parse(localStorage.getItem('app'));
        delete running.active[activePlayer];
        running.active[clickedMusic] = app.files[clickedMusic];
        running.active[clickedMusic].xPosition = xPosition;
        running.active[clickedMusic].yPosition = yPosition;
        localStorage.setItem('running', JSON.stringify(running));
        dispatch({
            type: 'REFRESH_RUNNING_DATA',
            data: JSON.parse(localStorage.getItem('running'))
        });
        dispatch(getSpecificMusic(clickedMusic));
    }
}

export const changeImage = (index, image) => {
    return dispatch => {
        let app = JSON.parse(localStorage.getItem('app'));
        let running = JSON.parse(localStorage.getItem('running'));
        running.active[index].image = image;
        app.files[index].image = image;
        localStorage.setItem('app', JSON.stringify(app));
        localStorage.setItem('running', JSON.stringify(running));
        dispatch({
            type: 'REFRESH_DATA',
            data: JSON.parse(localStorage.getItem('app'))
        });
        dispatch({
            type: 'REFRESH_RUNNING_DATA',
            data: JSON.parse(localStorage.getItem('running'))
        });
    }
}