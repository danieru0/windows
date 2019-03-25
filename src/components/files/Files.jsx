import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addRunningAppToLocalStorage } from '../../store/actions/localStorage';

import FileIcon from './FileIcon';

import './Files.css';

class Files extends Component {

    openApp = e => {
        let clickedApp = this.props.files[e.target.id];
        if (clickedApp.type !== 'link') {
            this.props.addRunningAppToLocalStorage(this.props.applications, clickedApp);
        } else {
            window.open(clickedApp.href);
        }
    }

    render() {
        const { files } = this.props;
        return (
            <>
                {
                    Object.keys(files).map((item, key) => {
                        let file = files[item];
                        return (
                            <FileIcon key={key} xPosition={file.xPosition} yPosition={file.yPosition} index={item} onDoubleClick={this.openApp} name={file.name} background={file.background} />
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

export default connect(mapStateToProps , {addRunningAppToLocalStorage })(Files);