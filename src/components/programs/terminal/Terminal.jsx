import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { help } from '../../../store/actions/terminal';
import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import './Terminal.css';

class Terminal extends Component {

    componentDidMount() {
        let input = document.getElementById('terminal-input');

        input.focus();
        input.addEventListener('blur', () => {
            input.focus();
        })
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.index);
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.index);
    }

    handleInputEnter = e => {
        if (e.key === 'Enter') {
            try {
                this.props[e.target.value]();
            } catch {
                this.output.innerHTML += `<p>Command not found!</p><p><br /></p>`;
                document.getElementById('terminal-content').scrollTop = document.getElementById('terminal-content').scrollHeight;
            }
            e.target.value = '';
        }
    }

    render() {
        const { output, appData } = this.props;
        if (this.output) {
            this.output.innerHTML += output;
            document.getElementById('terminal-content').scrollTop = document.getElementById('terminal-content').scrollHeight;
        }
        return (
            <Draggable handle=".terminal__topbar" bounds="body">
                <div id="terminal" className={appData.minimalized ? "terminal minimalized" : "terminal"}>
                    <div className="terminal__topbar">
                        <span className="terminal__name">Terminal</span>
                        <div className="terminal__program-options">
                            <button onClick={this.handleMinimalizeButton} className="terminal__minimalize">
                                <span className="terminal__minimalize-icon fa fa-window-minimize"></span>
                            </button>                            
                            <button onClick={this.handleCloseButton} className="terminal__close">
                                <span className="terminal__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div id="terminal-content" className="terminal__content">
                        <div ref={r => this.output = r} className="terminal__output">
                            <p>Type 'help' to get command list</p>
                            <p><br /></p>
                        </div>
                        <span>> </span><input onKeyPress={this.handleInputEnter} id="terminal-input" className="terminal__input"></input>
                    </div>
                </div>
            </Draggable>            
        )
    }
}

const mapStateToProps = state => {
    return {
        output: state.terminal.output,
        applications: state.localStorage.apps,
        refresh: state.terminal.refresh
    }
}

export default connect(mapStateToProps, { help, removeRunningAppFromLocalStorage, toggleMinimalizeApp })(Terminal);