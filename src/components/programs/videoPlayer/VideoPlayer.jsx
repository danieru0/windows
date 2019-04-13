import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { getSpecificVideo } from '../../../store/actions/videoPlayer';
import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import './VideoPlayer.css'

class VideoPlayer extends Component {

    componentDidMount() {
        this.props.getSpecificVideo(this.props.appData.index);
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.index);
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.index);
    }

    render() {
        const { appData, video } = this.props;
        return (
            <Draggable handle=".videoplayer__topbar" bounds="body">
                <div className={appData.minimalized ? "videoplayer minimalized" : "videoplayer"}>
                    <div className="videoplayer__topbar">
                        <span className="videoplayer__name">Video Player</span>
                        <div className="videoplayer__program-options">
                            <button onClick={this.handleMinimalizeButton} className="videoplayer__minimalize">
                                <span className="videoplayer__minimalize-icon fa fa-window-minimize"></span>
                            </button>
                            <button onClick={this.handleCloseButton} className="videoplayer__close">
                                <span className="videoplayer__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div className="videoplayer__content">
                        <video src={video.base64} controls autoPlay className="videoplayer__video"></video>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        applications: state.localStorage.apps,
        video: state.videoPlayer.video
    }
}

export default connect(mapStateToProps, { getSpecificVideo, removeRunningAppFromLocalStorage, toggleMinimalizeApp })(VideoPlayer);