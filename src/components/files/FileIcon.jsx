import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { saveFilePosition } from '../../store/actions/localStorage';

class FileIcon extends Component {

    handleDrag = (e) => {
        let xPosition = e.x - e.offsetX;
        let yPosition = e.layerY - e.offsetY;
        this.props.saveFilePosition(this.props.data, xPosition, yPosition, e.target.id);
    }

    render() {
        const { name, background, index, xPosition, yPosition } = this.props;
        const defaultPosition = {
            x: xPosition ? xPosition : null,
            y: yPosition ? yPosition : null
        }
        
        return (
            <Draggable defaultPosition={defaultPosition}  onDrag={this.handleDrag} bounds="body">
                <div className="file">
                    <div onDoubleClick={this.props.onDoubleClick} id={index} className="file__overlay"></div>
                    <img className="file__img" alt="file" src={background}></img>
                    <p className="file__name">{name}</p>
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