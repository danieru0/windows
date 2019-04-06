import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeFileName, removeFile, removeRunningAppFromLocalStorage } from '../../store/actions/localStorage';
import { createNewTxtFile } from '../../store/actions/contextMenu';
import { runLinkApplication } from '../../store/actions/linkProgram';

import './contextMenu.css';

class ContextMenu extends Component {

    createNewTxtFile = () => {
        this.props.createNewTxtFile(this.props.data);
        this.props.handleClickedItem();
    }

    createNewLinkFile = () => {
        this.props.runLinkApplication(this.props.applications);
        this.props.handleClickedItem();
    }

    renameFile = () => {
        this.props.handleClickedItem();
        let newFileName = prompt('New file name:');

        if (newFileName !== null) {
            this.props.changeFileName(this.props.data, newFileName, this.props.clickedElementId);
        }
    }

    removeFile = () => {
        this.props.handleClickedItem();
        this.props.removeFile(this.props.data, this.props.clickedElementId);
    }

    closeProgram = () => {
        this.props.handleClickedItem();
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.clickedElementId);
    }

    render() {
        const { active, clickedElement, left, top } = this.props

        if (!active) {
            return false;
        }

        return (
            <div style={{left: left, top: top}} className="contextMenu">
                <ul className="contextMenu__list">
                    {
                        clickedElement.className === 'App' ? (
                            <>
                                <li onClick={this.createNewLinkFile} className="contextMenu__item">
                                    New link file
                                </li>
                                <li onClick={this.createNewTxtFile} className="contextMenu__item">
                                    New txt file
                                </li>
                            </>
                        ) : (
                            ''
                        )
                    }
                    {
                        clickedElement.className === 'file__overlay' ? (
                            <>
                                <li onClick={this.renameFile} className="contextMenu__item">
                                    Rename file
                                </li>
                                <li onClick={this.removeFile} className="contextMenu__item">
                                    Delete file
                                </li>
                            </>
                        ) : (
                            ''
                        )
                    }
                    {
                        clickedElement.className === 'taskbar__file' ? (
                            <>
                                <li onClick={this.closeProgram} className="contextMenu__item">
                                    Close file
                                </li>
                            </>
                        ) : (
                            ''
                        )
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.localStorage.data,
        applications: state.localStorage.apps
    }
}

export default connect(mapStateToProps, { createNewTxtFile, runLinkApplication, changeFileName, removeFile, removeRunningAppFromLocalStorage })(ContextMenu);