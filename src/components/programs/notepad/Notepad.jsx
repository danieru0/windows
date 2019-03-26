import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';


import { saveNotepadState } from '../../../store/actions/notepadProgram';
import { removeRunningAppFromLocalStorage, saveProgramPosition } from '../../../store/actions/localStorage';

import './Notepad.css';

class Notepad extends Component {
    componentDidMount() {
        this.notepadEditor.innerHTML = this.props.appData.text;
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
        this.props.saveNotepadState(this.props.data, this.props.appData.index, this.notepadEditor.innerHTML, this.props.applications);
    }

    handleEditorOptionClick = e => {
        e.preventDefault();
        document.execCommand(e.currentTarget.value, false);
    }

    makeFirst = () => {
        this.notepad.classList.add('active');
    }

    removeFirst = e => {
        this.notepad.classList.remove('active');
    }

    render() {
        const { appData } = this.props;
        const defaultPosition = {
            x: appData.xPosition ? appData.xPosition : null,
            y: appData.yPosition ? appData.yPosition : null
        }

        return (
            <Draggable defaultPosition={defaultPosition} onDrag={(e) => {this.makeFirst(e); this.handleDrag(e)}} handle=".notepad__topbar" bounds="body">
                <div ref={r => this.notepad = r} onBlur={this.removeFirst} onFocus={this.makeFirst} className="notepad">
                    <div className="notepad__topbar">
                        <div className="notepad__options">
                            <button className="notepad__btn btn-save" onClick={this.saveNotepadText}>
                                <span className="fa fa-save"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="bold" className="notepad__btn btn-bold">
                                <span className="fa fa-bold"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="italic" className="notepad__btn btn-italic">
                                <span className="fa fa-italic"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="underline" className="notepad__btn btn-underline">
                                <span className="fa fa-underline"></span>
                            </button>
                        </div>
                        <span className="notepad__name">{appData.name}</span>
                        <div className="notepad__program-options">
                            <button onClick={this.handleCloseButton} className="notepad__close">
                                <span className="notepad__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div ref={r => this.notepadEditor = r} contentEditable="true" className="notepad__textarea"></div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        applications: state.localStorage.apps,
        data: state.localStorage.data
    }
}

export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, saveProgramPosition, saveNotepadState })(Notepad);