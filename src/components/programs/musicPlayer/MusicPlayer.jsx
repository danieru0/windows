import React, { Component } from 'react';
import Draggable from 'react-draggable';

import './MusicPlayer.css';

class MusicPlayer extends Component {
    constructor() {
        super();
        this.state = {
            audioDuration: null,
            audioDurationUpdate: null,
            audioElement: null
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

    componentDidMount() {
        let allAudio = JSON.parse(localStorage.getItem('audio'));
        let audio = document.createElement('audio');
        audio.src = allAudio[this.props.appData.index]
        audio.ref = ref => this.audioElement = ref;
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
            this.inputRange.value = audio.currentTime;
            this.setState({
                audioDurationUpdate: this.convertTime(audio.currentTime)
            });
        }
        audio.play();
    }

    handleRangeChange = e => {
        let audioElement = this.state.audioElement;
        audioElement.currentTime = e.target.value;
        this.setState({ audioElement: audioElement })
    }

    render() {
        const { appData } = this.props;
        return (
            <Draggable handle=".musicplayer__topbar" bounds="body">
                <div className="musicplayer">
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
                            <button className="musicplayer__mainbtn">
                                <span className="fa fa-pause"></span>
                            </button>
                            <button className="musicplayer__repeat">
                                <span className="fa fa-redo"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }
}

export default MusicPlayer;