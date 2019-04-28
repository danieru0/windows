import React, { Component } from 'react';
import { mouseWheelZoom } from 'mouse-wheel-zoom';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import db from '../../../indexedDB/db';

import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import './ImageViewer.css';

class ImageViewer extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            maximize: false
        }
    }

    componentDidMount() {
        db.images.where('index').equals(this.props.appData.index).toArray().then(result => {
            this.setState({
                image: result[0].base64
            }, () => {
                this.mw = mouseWheelZoom({
                    element: document.querySelector('.imageviewer__image'),
                    zoomStep: .25
                })
            })
        })
    }

    handleResizeButton = () => {
        this.setState({ maximize: !this.state.maximize }, () => this.mw.reset());
        this.imageviewer.style.transform = null;
        this.imageviewer.style.top = 0;
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.fileIndex)
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.fileIndex);
    }

    render() {
        const { appData } = this.props;
        return (
            <Draggable handle=".imageviewer__topbar" bounds="body">
                <div ref={r => this.imageviewer = r} onClick={() => this.props.onClick(this.imageviewer)} className={
                    appData.minimalized ? (this.state.maximize ? "imageviewer minimalized maximize" : "imageviewer minimalized") : (this.state.maximize ? "imageviewer maximize" : "imageviewer")
                    }>
                    <div className="imageviewer__topbar">
                        <span className="imageviewer__name">Image Viewer</span>
                        <div className="imageviewer__program-options">
                            <button onClick={this.handleMinimalizeButton} className="imageviewer__minimalize">
                                <span className="imageviewer__minimalize-icon fa fa-window-minimize"></span>
                            </button>      
                            <button onClick={this.handleResizeButton} className="imageviewer__resize">
                                <span className="imageviewer__resize-icon fa fa-window-maximize"></span>
                            </button>                      
                            <button onClick={this.handleCloseButton} className="imageviewer__close">
                                <span className="imageviewer__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div className="imageviewer__content">
                        <img className="imageviewer__image" alt="" src={this.state.image}></img>
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

export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, toggleMinimalizeApp })(ImageViewer);