import React, { Component } from 'react';

import Spinner from '../spinner/Spinner';

import './loadingScreen.css';

class LoadingScreen extends Component {

    render() {
        const { active } = this.props;  
        return (
            <div className={active ? 'loadingScreen active' : 'loadingScreen'}>
                <Spinner />
            </div>
        )
    }
}

export default LoadingScreen;