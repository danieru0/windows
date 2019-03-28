import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleTaskbarContextMenu } from '../../store/actions/taskbar';

import TaskbarContext from './Taskbar-context/Taskbar-context';

import './Taskbar.css';

class Taskbar extends Component {

    toggleContextMenu = () => {
        this.props.toggleTaskbarContextMenu(!this.props.contextMenu);
    }

    clickedOutside = value => {
        this.props.toggleTaskbarContextMenu(value);
    }

    render() {
        const { contextMenu } = this.props;
        return (
            <div className="taskbar">
                {
                    contextMenu ? <TaskbarContext hideContextMenu={this.clickedOutside} /> : ''
                }
                <button onClick={this.toggleContextMenu} className="taskbar__windows-btn">
                    <img className="taskbar__window-icon" alt="" src="https://img.icons8.com/color/96/000000/windows-10.png"></img>
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        contextMenu: state.taskbar.taskbarContext
    }
}

export default connect(mapStateToProps, { toggleTaskbarContextMenu })(Taskbar);