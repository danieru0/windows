import React, { Component } from 'react';
import Draggable from 'react-draggable';

import './MusicPlayer.css';

class MusicPlayer extends Component {

    render() {
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
                            <p>Tycho - Montana</p>
                        </div>
                        <div className="musicplayer__timeline">
                            <span className="musicplayer__time">00:00</span>
                            <input className="musicplayer__range" type="range" value="0" max="1"></input>
                            <span className="musicplayer__time">03:23</span>
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