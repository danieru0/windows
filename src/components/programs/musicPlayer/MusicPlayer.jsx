import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';
import { getSpecificMusic, changeImage } from '../../../store/actions/musicPlayer';

import './MusicPlayer.css';

class MusicPlayer extends Component {
    constructor() {
        super();
        this.state = {
            audioDuration: null,
            audioDurationUpdate: null,
            audioPause: false,
            volumeValue: 0.3,
            audioLoop: false
        }
    }

    componentDidMount() {
        this.props.getSpecificMusic(this.props.appData.index);
        this.audioElement.volume = 0.3;
        this.audioElement.onloadedmetadata = () => {
            this.inputRange.max = this.audioElement.duration;
            this.setState({
                audioDuration: this.convertTime(this.audioElement.duration)
            });
        }
        this.audioElement.onchange = () => this.audioElement.currentTime = this.inputRange.value;
        this.audioElement.ontimeupdate = () => {
            if (this.inputRange) {
                this.inputRange.value = this.audioElement.currentTime;
                this.setState({
                    audioDurationUpdate: this.convertTime(this.audioElement.currentTime)
                });
            }
        }

        let number = 0;
        this.textInterval = setInterval(() => {
            if (number < 360) {
                number++;
                this.musicTitle.style.left = `${number}px`;
            } else {
                number = -376;
            }
        }, 30)
    }
    componentWillUnmount() {
        this.audioElement.pause();
        clearInterval(this.textInterval);
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


    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.fileIndex);
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.fileIndex);
    }

    handleRangeChange = e => {
        this.audioElement.currentTime = e.target.value;
    }

    musicTrigger = () => {
        this.setState({
            audioPause: !this.state.audioPause
        }, () => {
            this.state.audioPause ? this.audioElement.pause() : this.audioElement.play();
        })
    }

    handleVolumeChange = e => {
        this.audioElement.volume = e.target.value;
        this.setState({
            volumeValue: e.target.value
        })
    }

    toggleLoop = () => {
        this.setState({
            audioLoop: !this.state.audioLoop
        }, () => {
            this.audioElement.loop = this.state.audioLoop;
        });
    }

    changeImage = () => {
        let urlPrompt = prompt('URL: ');
        if (urlPrompt) {
            this.props.changeImage(this.props.appData.index, urlPrompt);
        }
    }

    render() {
        const { appData, music } = this.props;
        const defaultPosition = {
            x: appData.xPosition ? appData.xPosition : 0,
            y: appData.yPosition ? appData.yPosition : 0
        }
        return (
            <Draggable defaultPosition={defaultPosition} handle=".musicplayer__topbar" bounds="body">
                <div ref={r => this.musicElement = r} onClick={() => this.props.onClick(this.musicElement)} id={appData.fileIndex} className={appData.minimalized ? "musicplayer minimalized" : "musicplayer"}>
                    <audio autoPlay ref={r => this.audioElement = r} src={music ? music.base64 : ''}></audio>
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
                            <button onClick={this.changeImage} title="Change image" className="musicplayer__image-btn">
                                <span className="fa fa-image"></span>
                            </button>
                        </div>
                        <div className="musicplayer__info">
                            <img alt="" src={appData.image}></img>
                            <p ref={r => this.musicTitle = r}>{appData.name}</p>
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
                            <button onClick={this.toggleLoop} className="musicplayer__repeat">
                                <span className={this.state.audioLoop ? "fa fa-redo" : "fa fa-redo not-clicked"}></span>
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
        applications: state.localStorage.apps,
        music: state.musicPlayer.music
    }
}

export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, toggleMinimalizeApp, getSpecificMusic, changeImage })(MusicPlayer);