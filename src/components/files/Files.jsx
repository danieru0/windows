import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addRunningAppToLocalStorage } from '../../store/actions/localStorage';
import { getSpecificMusic, loadNewMusic } from '../../store/actions/musicPlayer';
import { getSpecificVideo } from '../../store/actions/videoPlayer';

import FileIcon from './FileIcon';

import './Files.css';

class Files extends Component {

    openApp = e => {
        let clickedApp = this.props.files[e.target.id];
        if (clickedApp.password) {
            let passwordPrompt = prompt('Password: ');
            if (passwordPrompt) {
                if (passwordPrompt !== clickedApp.password) {
                    this.openApp(e);
                    return false;
                }
            } else {
                return false;
            }
        }
        if (clickedApp.type !== 'link') {
            let clickedProgram = document.querySelector(clickedApp.type === 'audio' ? '.musicplayer' : '.videoplayer');
            if (!clickedProgram) {
                this.props.addRunningAppToLocalStorage(this.props.applications, clickedApp);
            } else {
                if (clickedApp.type === 'audio') {
                    let position = clickedProgram.getBoundingClientRect();
                    this.props.loadNewMusic(clickedProgram.id, clickedApp.index, position.left, position.top);
                }
                if (clickedApp.type === 'video') {
                    this.props.getSpecificVideo(clickedApp.index);
                }
            }
        } else {
            window.open(clickedApp.href);
        }
    }

    render() {
        const { files } = this.props;
        let top = -120;
        let left = 0;
        return (
            <>
                {
                    Object.keys(files).map(item => {
                        let file = files[item];
                        top += 120;
                        if (top > window.innerHeight - 100) {
                            top = 0;
                            left += 120;
                        }
                        return (
                            <FileIcon key={item} firstPosition={{top: top, left: left}} xPosition={file.xPosition} yPosition={file.yPosition} index={item} onDoubleClick={this.openApp} name={file.name} background={file.background} />
                        )
                    })
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        applications: state.localStorage.apps
    }
}

export default connect(mapStateToProps , { addRunningAppToLocalStorage, getSpecificMusic, loadNewMusic, getSpecificVideo })(Files);