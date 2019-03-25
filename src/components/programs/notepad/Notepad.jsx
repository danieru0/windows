import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

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
        this.setState({
            textAreaValue: this.props.appData.text
        });
        this.ref.innerHTML = this.props.appData.text;
    }

    textAreaHandler = e => {
        this.setState({ textAreaValue: e.target.value });
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.index);
    }

    handleDrag = e => {
        let xPosition = e.x - e.offsetX;
        let yPosition = e.layerY - e.offsetY;
        this.props.saveProgramPosition(this.props.applications, xPosition, yPosition, this.props.appData.index); 
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
                            <button>save</button>
                        </div>
                        <span className="notepad__name">{appData.name}</span>
                        <div className="notepad__program-options">
                            <button onClick={this.handleCloseButton} className="notepad__close">
                                <span className="notepad__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div ref={r => this.ref = r} contentEditable="true" onChange={this.textAreaHandler} id={appData.index} className="notepad__textarea"></div>
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

export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, saveProgramPosition })(Notepad);