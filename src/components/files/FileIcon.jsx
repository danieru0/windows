import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { saveFilePosition } from '../../store/actions/localStorage';

class FileIcon extends Component {

    handleDrag = e => {
        let xPosition = e.x - e.offsetX;
        let yPosition = e.layerY - e.offsetY;
        this.props.saveFilePosition(this.props.data, xPosition, yPosition, e.target.id);
        if (e.target.className !== 'App') {
            if (e.target.className === 'file__overlay') {
                if (e.target.parentElement.nextElementSibling.className !== 'taskbar') {
                    e.target.parentElement.parentElement.insertBefore(e.target.parentElement, document.querySelector('.taskbar'));
                }
            }
        }
    }

    handleStop = () => {
        this.file.style.zIndex = 'auto';
    }

    render() {
        const { name, background, index, xPosition, yPosition, firstPosition } = this.props;
        const defaultPosition = {
            x: xPosition ? xPosition : firstPosition.left,
            y: yPosition ? yPosition : firstPosition.top
        }

        let shortName;
        
        if (name.length > 30) {
            shortName = name.substring(0, 30)+'...';
        }

        return (
            <Draggable defaultPosition={defaultPosition} onStop={this.handleStop} onDrag={this.handleDrag} bounds="body">
                <div ref={r => this.file = r} title={name} className="file">
                    <div onDoubleClick={this.props.onDoubleClick} id={index} className="file__overlay"></div>
                    <img className="file__img" alt="file" src={background}></img>
                    <p className="file__name">{shortName ? shortName : name}</p>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.localStorage.data
    }
}

export default connect(mapStateToProps, { saveFilePosition })(FileIcon);