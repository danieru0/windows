import React, { Component } from 'react'
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import './Link.css';

class Link extends Component {

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.index)
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.index);
    }

    render() {
        const { minimalized } = this.props;
        return (
            <Draggable handle=".link__topbar" bounds="body">
                <div ref={r => this.linkProgram = r} className={minimalized ? "link minimalized" : "link"}>
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
                            <label className="link__label" htmlFor="Link">Link: </label>
                            <input className="link__input" placeholder="Link url" id="Link"></input>
                        </div>
                        <div className="link__input-group">
                            <label className="link__label" htmlFor="Icon">Icon image: </label>
                            <input className="link__input" placeholder="Image url" id="Icon"></input>
                        </div>
                        <button className="link__btn">Create</button>
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

export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, toggleMinimalizeApp })(Link);