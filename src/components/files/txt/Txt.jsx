import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Txt extends Component {

    render() {
        const { name, background, index } = this.props;
        return (
            <Draggable bounds="body">
                <div className="file">
                    <div onDoubleClick={this.props.onDoubleClick} value={index} className="file__overlay"></div>
                    <img className="file__img" alt="file" src={background}></img>
                    <p className="file__name">{name}</p>
                </div>
            </Draggable>
        )
    }
}

export default Txt;