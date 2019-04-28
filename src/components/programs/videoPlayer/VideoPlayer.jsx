import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { getSpecificVideo, clearVideoReducer } from '../../../store/actions/videoPlayer';
import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import './VideoPlayer.css'

class VideoPlayer extends Component {
    constructor() {
        super();
        this.state = {
            videoDuration: '00:00',
            videoDurationUpdate: '00:00',
            volumeValue: 0.3,
            videoPause: false,
            maximize: false
        }
    }

    componentDidMount() {
        this.props.getSpecificVideo(this.props.appData.index);
        this.videoElement.volume = 0.3;
        this.videoElement.onloadedmetadata = () => {
            this.setState({
                videoDuration: this.convertTime(this.videoElement.duration)
            });
        }
        this.barWidth = getComputedStyle(this.videoBar).width.split('px')[0];
        this.videoElement.ontimeupdate = () => {
            if (this.progressBar) {
                this.progressBar.style.width = `${this.videoElement.currentTime*this.barWidth/this.videoElement.duration}px`;
                this.setState({
                    videoDurationUpdate: this.convertTime(this.videoElement.currentTime)
                });
            }
        }
    }

    componentWillUnmount() {
        document.getElementById('videoElement').src = null;
        this.props.clearVideoReducer();
    }

    handleBarClick = e => {
        let rect = this.videoBar.getBoundingClientRect();
        let mouseX = e.pageX - rect.x;
        this.barWidth = parseInt(getComputedStyle(this.videoBar).width.split('px')[0]);
        this.videoElement.currentTime = mouseX * this.videoElement.duration / this.barWidth;
        this.videoElement.play();
        this.setState({
            videoPause: false
        })
    }

    handleVolumeChange = e => {
        this.videoElement.volume = e.target.value;
        this.setState({
            volumeValue: e.target.value
        });
    }

    videoToggle = () => {
        this.setState({
            videoPause: !this.state.videoPause
        }, () => {
            this.state.videoPause ? this.videoElement.pause() : this.videoElement.play();
        })
    }

    handleResize = () => {
        if (this.videoElement.requestFullscreen) {
            this.videoElement.requestFullscreen();
        } else if (this.videoElement.webkitEnterFullScreen) {
            this.videoElement.webkitEnterFullScreen();
        } else if (this.videoElement.mozRequestFullScreen) {
            this.videoElement.mozRequestFullScreen();
        }
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.fileIndex);
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.fileIndex);
    }

    handleResizeButton = () => {
        this.setState({ maximize: !this.state.maximize });
        this.videoPlayer.style.transform = null;
        this.videoPlayer.style.top = 0;
    }

    convertTime = function(time) {
        var mins = Math.floor(time / 60);
        if (mins < 10) {
          mins = '0' + String(mins);
        }
        var secs = Math.floor(time % 60);
        if (secs < 10) {
          secs = '0' + String(secs);
        }
    
        return mins + ':' + secs;
    }

    render() {
        const { appData, video } = this.props;
        return (
            <Draggable handle=".videoplayer__topbar" bounds="body">
                <div ref={r => this.videoPlayer = r} onClick={() => this.props.onClick(this.videoPlayer)} className={
                    appData.minimalized ? (this.state.maximize ? "videoplayer minimalized maximize" : "videoplayer minimalized") : (this.state.maximize ? "videoplayer maximize" : "videoplayer")
                    }>
                    <div className="videoplayer__topbar">
                        <span className="videoplayer__name">Video Player</span>
                        <div className="videoplayer__program-options">
                            <button onClick={this.handleMinimalizeButton} className="videoplayer__minimalize">
                                <span className="videoplayer__minimalize-icon fa fa-window-minimize"></span>
                            </button>
                            <button onClick={this.handleResizeButton} className="videoplayer__resize">
                                <span className="videoplayer__resize-icon fa fa-window-maximize"></span>
                            </button>    
                            <button onClick={this.handleCloseButton} className="videoplayer__close">
                                <span className="videoplayer__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div className="videoplayer__content">
                        <video ref={r => this.videoElement = r} id="videoElement" controlsList="nodownload" autoPlay src={video.base64} className="videoplayer__video"></video>
                        <div className="videoplayer__controls">
                            <div onClick={this.handleBarClick} ref={r => this.videoBar = r} className="videoplayer__defaultBar">
                                <div ref={r => this.progressBar = r} className="videoplayer__progressBar"></div>
                            </div>
                            <div className="videoplayer__wrapper">
                                <div className="videoplayer__group">
                                    <button onClick={this.videoToggle} className="videoplayer__button videoplayer__toggle">
                                        {
                                            this.state.videoPause ? <span className="fa fa-play"></span> : <span className="fa fa-pause"></span>
                                        }
                                    </button>
                                    <button className="videoplayer__button videoplayer__volume">
                                        <span className="fa fa-volume-up"></span>
                                    </button>
                                    <input type="range" onChange={this.handleVolumeChange} value={this.state.volumeValue} min="0" max="1" step="0.01" className="videoplayer__volume-range"></input>
                                </div>
                                <span className="videoplayer__time">
                                    {
                                        `${this.state.videoDurationUpdate} / ${this.state.videoDuration}`
                                    }
                                </span>
                                <div className="videoplayer__group">
                                    <button onClick={this.handleResize} className="videoplayer__button videoplayer__resize">
                                        <span className="fa fa-expand"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, { getSpecificVideo, removeRunningAppFromLocalStorage, toggleMinimalizeApp, clearVideoReducer })(VideoPlayer);