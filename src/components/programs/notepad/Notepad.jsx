import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';


import { saveNotepadState } from '../../../store/actions/notepadProgram';
import { removeRunningAppFromLocalStorage, saveProgramPosition, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import './Notepad.css';

class Notepad extends Component {
    constructor() {
        super();
        this.state = {
            typing: false,
            maximize: false
        }
    }
    componentDidMount() {
        this.notepadEditor.innerHTML = this.props.appData.text;
        this.notepadEditor.addEventListener('keydown', this.keyShortcut);
    }

    keyShortcut = e => {
        if ((e.key === 's' || e.key === 'S') && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            this.setState({
                typing: false
            })
            this.props.saveNotepadState(this.props.data, this.props.appData.fileIndex, this.notepadEditor.innerHTML, this.props.applications);
        }
    }

    handleTextAreaChange = e => {
        this.setState({
            typing: true
        })
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.fileIndex);
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.fileIndex);
    }

    handleDrag = e => {
        let xPosition = e.x - e.offsetX;
        let yPosition = e.layerY - e.offsetY;
        this.props.saveProgramPosition(this.props.applications, xPosition, yPosition, this.props.appData.fileIndex); 
    }

    saveNotepadText = () => {
        this.props.saveNotepadState(this.props.data, this.props.appData.fileIndex, this.notepadEditor.innerHTML, this.props.applications);
        this.setState({
            typing: false
        })
    }

    handleEditorOptionClick = e => {
        e.preventDefault();
        if (e.currentTarget.value !== 'createLink' && e.currentTarget.value !== 'insertImage') {
            document.execCommand(e.currentTarget.value, false);
        } else {
            let url = prompt('URL: ');
            if (url) {
                document.execCommand(e.currentTarget.value, false, url);
            }
        }
    }

    handleResizeButton = () => {
        this.setState({ maximize: !this.state.maximize });
        this.notepad.style.transform = null;
        this.notepad.style.top = 0;
    }

    render() {
        const { appData, applications } = this.props;
        const defaultPosition = {
            x: applications.active[appData.fileIndex].xPosition ? applications.active[appData.fileIndex].xPosition : 0,
            y: applications.active[appData.fileIndex].yPosition ? applications.active[appData.fileIndex].yPosition : 0
        }

        return (
            <Draggable defaultPosition={defaultPosition} onDrag={(e) => this.handleDrag(e)} handle=".notepad__topbar" bounds="body">
                <div ref={r => this.notepad = r} onClick={() => this.props.onClick(this.notepad)} className={
                    appData.minimalized ? (this.state.maximize ? "notepad minimalized maximize" : "notepad minimalized") : (this.state.maximize ? "notepad maximize" : "notepad")
                    }>
                    <div className="notepad__topbar">
                        <span className="notepad__name">{appData.name}</span>
                        <div className="notepad__program-options">
                            <button onClick={this.handleMinimalizeButton} className="notepad__minimalize">
                                <span className="notepad__minimalize-icon fa fa-window-minimize"></span>
                            </button>        
                            <button onClick={this.handleResizeButton} className="notepad__resize">
                                <span className="notepad__resize-icon fa fa-window-maximize"></span>
                            </button>                       
                            <button onClick={this.handleCloseButton} className="notepad__close">
                                <span className="notepad__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div className="notepad__content">
                        <div className="notepad__options">
                            <button className={this.state.typing ? "notepad__btn not-saved btn-save" : "notepad__btn btn-save"} onClick={this.saveNotepadText}>
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
                            <button onMouseDown={this.handleEditorOptionClick} value="justifyLeft" className="notepad__btn">
                                <span className="fa fa-align-left"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="justifyCenter" className="notepad__btn">
                                <span className="fa fa-align-center"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="justifyRight" className="notepad__btn">
                                <span className="fa fa-align-right"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="justifyFull" className="notepad__btn">
                                <span className="fa fa-align-justify"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="insertUnorderedList" className="notepad__btn">
                                <span className="fa fa-list-ul"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="insertOrderedList" className="notepad__btn">
                                <span className="fa fa-list-ol"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="outdent" className="notepad__btn">
                                <span className="fa fa-outdent"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="indent" className="notepad__btn">
                                <span className="fa fa-indent"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="createLink" className="notepad__btn">
                                <span className="fa fa-link"></span>
                            </button>
                            <button onMouseDown={this.handleEditorOptionClick} value="insertImage" className="notepad__btn">
                                <span className="fa fa-image"></span>
                            </button>
                        </div>
                        <div ref={r => this.notepadEditor = r} contentEditable="true" onInput={this.handleTextAreaChange} className="notepad__textarea"></div>
                    </div>
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

export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, saveProgramPosition, saveNotepadState, toggleMinimalizeApp })(Notepad);