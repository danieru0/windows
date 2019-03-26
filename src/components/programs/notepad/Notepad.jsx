import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';


import { saveNotepadState } from '../../../store/actions/notepadProgram';
import { removeRunningAppFromLocalStorage, saveProgramPosition } from '../../../store/actions/localStorage';

import './Notepad.css';

class Notepad extends Component {
    constructor() {
        super();
        this.state = {
            textAreaValue: ''
        }
    }

    componentDidMount() {
        this.ref.innerHTML = this.props.appData.text;
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.index);
    }

    handleDrag = e => {
        let xPosition = e.x - e.offsetX;
        let yPosition = e.layerY - e.offsetY;
        this.props.saveProgramPosition(this.props.applications, xPosition, yPosition, this.props.appData.index); 
    }

    saveNotepadText = () => {
        this.props.saveNotepadState(this.props.applications, this.props.appData.index, this.ref.innerHTML);
    }

    makeFirst = e => {
        e.target.parentNode.classList.add('active');
    }

    removeFirst = e => {
        e.target.parentNode.classList.remove('active');
    }

    render() {
        const { appData } = this.props;
        const defaultPosition = {
            x: appData.xPosition ? appData.xPosition : null,
            y: appData.yPosition ? appData.yPosition : null
        }

        return (
            <Draggable defaultPosition={defaultPosition} onDrag={(e) => {this.makeFirst(e); this.handleDrag(e)}} handle=".notepad__topbar" bounds="body">
                <div onBlur={this.removeFirst} onFocus={this.makeFirst} className="notepad">
                    <div className="notepad__topbar">
                        <div className="notepad__options">
                            <button onClick={this.saveNotepadText}>save</button>
                        </div>
                        <span className="notepad__name">{appData.name}</span>
                        <div className="notepad__program-options">
                            <button onClick={this.handleCloseButton} className="notepad__close">
                                <span className="notepad__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div ref={r => this.ref = r} contentEditable="true" className="notepad__textarea"></div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        applications: state.localStorage.apps
    }
}

export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, saveProgramPosition, saveNotepadState })(Notepad);