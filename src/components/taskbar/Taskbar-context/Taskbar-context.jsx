import React, { Component } from 'react';
import { connect } from 'react-redux';

import { runSettingsApplication } from '../../../store/actions/settings';
import { runCalculatorApplication } from '../../../store/actions/calculator';
import { runTerminalApplication } from '../../../store/actions/terminal';

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
        if (!document.querySelector('.settings')) {
            this.props.runSettingsApplication(this.props.applications);
        }
    }

    openCalculator = () => {
        if (!document.querySelector('.calculator')) {
            this.props.runCalculatorApplication(this.props.applications);
        }
    }

    openTerminal = () => {
        if (!document.querySelector('.terminal')) {
            this.props.runTerminalApplication(this.props.applications);
        }
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
                    <li className="taskbar__context-item">
                        <button onClick={this.openCalculator} className="taskbar__context-btn">
                            <span className="taskbar__context-icon fa fa-calculator"></span>
                            <p className="taskbar__context-text">Calculator</p>
                        </button>
                    </li>
                    <li className="taskbar__context-item">
                        <button onClick={this.openTerminal} className="taskbar__context-btn">
                            <span className="taskbar__context-icon fa fa-terminal"></span>
                            <p className="taskbar__context-text">Terminal</p>
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        applications: state.localStorage.apps
    }
}

export default connect(mapStateToProps, { runSettingsApplication, runCalculatorApplication, runTerminalApplication })(TaskbarContext);