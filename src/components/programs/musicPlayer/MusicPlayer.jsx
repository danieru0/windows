import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import './MusicPlayer.css';

class MusicPlayer extends Component {
    constructor() {
        super();
        this.state = {
            audioDuration: null,
            audioDurationUpdate: null,
            audioElement: null,
            audioPause: false,
            volumeValue: 0.3
        }
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

    componentWillUnmount() {
        let audioElement = this.state.audioElement;
        audioElement.pause();
    }

    componentDidMount() {
        let allAudio = JSON.parse(localStorage.getItem('audio'));
        let audio = document.createElement('audio');
        audio.src = allAudio[this.props.appData.index]
        audio.ref = ref => this.audioElement = ref;
        audio.volume = 0.3;
        this.setState({
            audioElement: audio,
        });
        audio.onloadedmetadata = () => {
            this.inputRange.max = audio.duration;
            this.setState({
                audioDuration: this.convertTime(audio.duration)
            });
        }
        audio.onchange = () => audio.currentTime = this.inputRange.value;
        audio.ontimeupdate = () => {
            if (this.inputRange) {
                this.inputRange.value = audio.currentTime;
                this.setState({
                    audioDurationUpdate: this.convertTime(audio.currentTime)
                });
            }
        }
        audio.play();
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.index);
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.index);
    }

    handleRangeChange = e => {
        let audioElement = this.state.audioElement;
        audioElement.currentTime = e.target.value;
    }

    musicTrigger = () => {
        let audioElement = this.state.audioElement;
        this.setState({
            audioPause: !this.state.audioPause
        }, () => {
            this.state.audioPause ? audioElement.pause() : audioElement.play();
        })
    }

    handleVolumeChange = e => {
        let audioElement = this.state.audioElement;
        audioElement.volume = e.target.value;
        this.setState({
            volumeValue: e.target.value
        })
    }

    render() {
        const { appData } = this.props;
        return (
            <Draggable handle=".musicplayer__topbar" bounds="body">
                <div className={appData.minimalized ? "musicplayer minimalized" : "musicplayer"}>
                    <div className="musicplayer__topbar">
                        <span className="musicplayer__name">Music Player</span>
                        <div className="musicplayer__program-options">
                            <button onClick={this.handleMinimalizeButton} className="musicplayer__minimalize">
                                <span className="musicplayer__minimalize-icon fa fa-window-minimize"></span>
                            </button>                            
                            <button onClick={this.handleCloseButton} className="musicplayer__close">
                                <span className="musicplayer__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div className="musicplayer__content">
                        <div className="musicplayer__top">
                            <p>Now playing</p>
                        </div>
                        <div className="musicplayer__info">
                            <img alt="" src="https://images-na.ssl-images-amazon.com/images/I/61R7gJadP7L._SX466_.jpg"></img>
                            <p>{appData.name}</p>
                        </div>
                        <div className="musicplayer__timeline">
                            <span className="musicplayer__time">{this.state.audioDurationUpdate}</span>
                            <input onChange={this.handleRangeChange} ref={ref => this.inputRange = ref} className="musicplayer__range" defaultValue="0" type="range"></input>
                            <span className="musicplayer__time">{this.state.audioDuration}</span>
                        </div>
                        <div className="musicplayer__buttons">
                            <button onClick={this.musicTrigger} className="musicplayer__mainbtn">
                                {
                                    this.state.audioPause ? <span className="fa fa-play"></span> : <span className="fa fa-pause"></span>
                                }
                            </button>
                            <button className="musicplayer__repeat">
                                <span className="fa fa-redo"></span>
                            </button>
                        </div>
                        <div className="musicplayer__volume">
                            <span className="fa fa-volume-up"></span>
                            <input className="musicplayer__volume-range" onChange={this.handleVolumeChange} value={this.state.volumeValue} step="0.01" min="0" max="1" type="range"></input>
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        applications: state.localStorage.apps
    }
}

export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, toggleMinimalizeApp })(MusicPlayer);