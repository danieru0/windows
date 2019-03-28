import React, { Component } from 'react';

import './Taskbar-context.css';

class TaskbarContext extends Component {

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = () => {
        this.props.hideContextMenu(false);
    }

    openSettings = () => {
        alert('ye');
    }

    render() {
        return (
            <div className="taskbar__context">
                <ul className="taskbar__context-list">
                    <li className="taskbar__context-item">
                        <button onClick={this.openSettings} className="taskbar__context-btn">
                            <span className="taskbar__context-icon fa fa-cog"></span>
                            <p className="taskbar__context-text">Settings</p>
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default TaskbarContext;