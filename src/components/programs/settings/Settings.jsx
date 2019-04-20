import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import Informations from './informations/Infromations';
import Wallpapers from './wallpapers/Wallpapers';
import Reset from './reset/Reset';

import './Settings.css';

class Settings extends Component {

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.index);
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.index);
    }

    handleSectionChange = e => {
        document.querySelector('.settings__item.active').classList.remove('active');
        e.target.classList.add('active');
        document.querySelector('.settings__section.active').classList.remove('active');
        document.getElementById(e.target.dataset.value).classList.add('active');
    }

    render() {
        const { appData } = this.props;
        return (
            <Draggable handle=".settings__topbar" bounds="body">
                <div className={appData.minimalized ? "settings minimalized" : "settings"}>
                    <div className="settings__topbar">
                        <span className="settings__name">Settings</span>
                        <div className="settings__program-options">
                            <button onClick={this.handleMinimalizeButton} className="settings__minimalize">
                                <span className="settings__minimalize-icon fa fa-window-minimize"></span>
                            </button>                            
                            <button onClick={this.handleCloseButton} className="settings__close">
                                <span className="settings__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div className="settings__content">
                        <div className="settings__sidenav">
                            <ul className="settings__list">
                                <li onClick={this.handleSectionChange} data-value="informations" className="settings__item settings__item-informations active">Informations</li>
                                <li onClick={this.handleSectionChange} data-value="wallpaper" className="settings__item settings__item-wallpaper">Wallpaper</li>
                                <li onClick={this.handleSectionChange} data-value="reset" className="settings__item settings__item-reset">Reset</li>
                            </ul>
                        </div>
                        <div className="settings__sections">
                            <section id="informations" className="settings__section settings__informations active">
                                <Informations />
                            </section>
                            <section id="wallpaper" className="settings__section settings__wallpaper">
                                <Wallpapers />
                            </section>
                            <section id="reset" className="settings__section settings__reset">
                                <Reset />
                            </section>
                        </div>
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

export default connect(mapStateToProps, { removeRunningAppFromLocalStorage, toggleMinimalizeApp })(Settings);