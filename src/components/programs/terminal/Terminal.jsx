import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { help, echo, author, calculator, touch, whoami, ls, rm, href, rename, passfile, passfilerm, kill, date, exec, clearOutput } from '../../../store/actions/terminal';
import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import './Terminal.css';

class Terminal extends Component {
    constructor() {
        super();
        this.state = {
            typing: false
        }
    }

    componentDidMount() {
        let input = document.getElementById('terminal-input');
        input.focus();
        input.addEventListener('blur', () => {
            input.focus();
        })
    }

    componentDidUpdate() {
        if (!this.state.typing) {
            this.props.clearOutput();
        }
    }
    
    componentWillUnmount() {
        this.props.clearOutput();
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.index);
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.index);
    }

    toggleTyping = () => {
        this.setState({
            typing: true
        });
    }

    handleInputEnter = e => {
        if (e.key === 'Enter') {
            if (e.target.value) {
                if (e.target.value !== 'cls' && e.target.value !== 'exit') {
                    try {
                        if (this.props.program) {
                            this.props[this.props.program](true, e.target.value);
                        } else {
                            this.props[e.target.value.split(' ')[0]](false, e.target.value);
                        }
                    } catch {
                        this.output.innerHTML += `<p>> ${e.target.value}</p><p>Command not found!</p>`;
                        document.getElementById('terminal-content').scrollTop = document.getElementById('terminal-content').scrollHeight;
                    }
                } else {
                    e.target.value === 'cls' ? this.output.innerHTML = '' : this.handleCloseButton();
                }
                e.target.value = '';
                this.setState({
                    typing: false
                })
            }
        }
    }

    render() {
        const { output, program, appData } = this.props;
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
                        <span>{program}> </span><input onChange={this.toggleTyping} onKeyPress={this.handleInputEnter} id="terminal-input" className="terminal__input"></input>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        output: state.terminal.output,
        program: state.terminal.program,
        applications: state.localStorage.apps,
        refresh: state.terminal.refresh
    }
}

export default connect(mapStateToProps, { help, echo, author, calculator, touch, whoami, ls, rm, href, rename, passfile, passfilerm, kill, date, exec, clearOutput, removeRunningAppFromLocalStorage, toggleMinimalizeApp })(Terminal);