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
        return (
            <>
                {
                    Object.keys(files).map(item => {
                        let file = files[item];
                        return (
                            <FileIcon key={item} xPosition={file.xPosition} yPosition={file.yPosition} index={item} onDoubleClick={this.openApp} name={file.name} background={file.background} />
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