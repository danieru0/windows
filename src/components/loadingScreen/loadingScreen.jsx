import React, { Component } from 'react';

import Spinner from '../spinner/Spinner';

import './loadingScreen.css';

class LoadingScreen extends Component {

    render() {
        return (
            <div className='loadingScreen'>
                <Spinner />
            </div>
        )
    }
}

export default LoadingScreen;