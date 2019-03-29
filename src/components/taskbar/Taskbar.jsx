import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleTaskbarContextMenu } from '../../store/actions/taskbar';
import { toggleMinimalizeApp } from '../../store/actions/localStorage';

import TaskbarContext from './Taskbar-context/Taskbar-context';

import './Taskbar.css';

class Taskbar extends Component {

    toggleContextMenu = () => {
        this.props.toggleTaskbarContextMenu(!this.props.contextMenu);
    }

    clickedOutside = value => {
        this.props.toggleTaskbarContextMenu(value);
    }

    handleTaskbarFileClick = index => {
        this.props.toggleMinimalizeApp(this.props.applications, index);
    }

    render() {
        const { contextMenu, applications } = this.props;
        return (
            <div className="taskbar">
                {
                    contextMenu ? <TaskbarContext hideContextMenu={this.clickedOutside} /> : ''
                }
                <button onClick={this.toggleContextMenu} className="taskbar__windows-btn">
                    <img className="taskbar__window-icon" alt="" src="https://img.icons8.com/color/96/000000/windows-10.png"></img>
                </button>
                {
                    applications ? (
                        Object.keys(applications.active).map((item, key) => {
                            let file = applications.active[item];
                            return (
                                <div onClick={() => this.handleTaskbarFileClick(file.index)} title={file.name} key={key} className="taskbar__file">
                                    <img className="taskbar__file-icon" alt="" src={file.background}></img>
                                </div>
                            )
                        })
                    ) : (
                        ''
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        contextMenu: state.taskbar.taskbarContext,
        applications: state.localStorage.apps
    }
}

export default connect(mapStateToProps, { toggleTaskbarContextMenu, toggleMinimalizeApp })(Taskbar);