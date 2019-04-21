import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import './Paint.css';

class Paint extends Component {
    constructor() {
        super();
        this.state = {
            mouseDown: false,
            posX: 0,
            posY: 0
        }
    }

    componentDidMount() {
        const ctx = this.canvas.getContext('2d');

        this.canvas.addEventListener('mouseenter', e => {
            this.setPosition(e);
        });

        this.canvas.addEventListener('mousemove', e => {
            if (this.state.mouseDown) {
                this.draw(e, ctx);
            }
        });

        this.canvas.addEventListener('mousedown', e => {
            this.setPosition(e);
            this.setState({
                mouseDown: true
            })
        });

        this.canvas.addEventListener('mouseup', e => {
            this.setState({
                mouseDown: false
            })
        })
    }

    setPosition = e => {
        let rect = this.canvas.getBoundingClientRect();
        this.setState({
            posX: e.clientX - rect.left,
            posY: e.clientY - rect.top
        });
    }

    draw = (e, ctx) => {
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000000';

        ctx.beginPath();
        ctx.moveTo(this.state.posX, this.state.posY);
        this.setPosition(e);
        ctx.lineTo(this.state.posX, this.state.posY);
        ctx.stroke();
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.index);
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.index);
    }

    render() {
        const { appData } = this.props;
        return (
            <Draggable handle=".paint__topbar" bounds="body">
                <div className={appData.minimalized ? "paint minimalized" : "paint"}>
                    <div className="paint__topbar">
                        <span className="paint__name">Paint</span>
                        <div className="paint__program-options">
                            <button onClick={this.handleMinimalizeButton} className="paint__minimalize">
                                <span className="paint__minimalize-icon fa fa-window-minimize"></span>
                            </button>                            
                            <button onClick={this.handleCloseButton} className="paint__close">
                                <span className="paint__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div className="paint__content">
                        <div className="paint__toolbar"></div>
                        <canvas ref={r => this.canvas = r} id="paint-canvas" width="800" height="550"></canvas>
                    </div>
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


export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, toggleMinimalizeApp })(Paint);