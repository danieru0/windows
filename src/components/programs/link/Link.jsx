import React, { Component } from 'react'
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';
import { createNewLinkFile } from '../../../store/actions/linkProgram';

import './Link.css';

class Link extends Component {
    constructor() {
        super();
        this.state = {
            link: null,
            icon: null
        }
    }

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.index)
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.index);
    }

    handleInputChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleBtnClick = () => {
        if (this.state.link) {
            this.props.createNewLinkFile(this.props.data, this.state.link, this.state.icon);
            this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.index);
        } else {
            alert('You need provide a link!');
        }
    }

    render() {
        const { minimalized } = this.props;
        return (
            <Draggable handle=".link__topbar" bounds="body">
                <div ref={r => this.linkProgram = r} onClick={() => this.props.onClick(this.linkProgram)} className={minimalized ? "link minimalized" : "link"}>
                    <div className="link__topbar">
                        <span className="link__name">Link</span>
                        <div className="link__program-options">
                            <button onClick={this.handleMinimalizeButton} className="link__minimalize">
                                <span className="link__minimalize-icon fa fa-window-minimize"></span>
                            </button>                            
                            <button onClick={this.handleCloseButton} className="link__close">
                                <span className="link__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div className="link__content">
                        <div className="link__input-group">
                            <label className="link__label" htmlFor="link">Link: </label>
                            <input onChange={this.handleInputChange} className="link__input" placeholder="Link url" id="link"></input>
                        </div>
                        <div className="link__input-group">
                            <label className="link__label" htmlFor="icon">Icon image: </label>
                            <input onChange={this.handleInputChange} className="link__input" placeholder="Image url" id="icon"></input>
                        </div>
                        <button onClick={this.handleBtnClick} className="link__btn">Create</button>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.localStorage.data,
        applications: state.localStorage.apps
    }
}

export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, toggleMinimalizeApp, createNewLinkFile })(Link);