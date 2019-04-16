import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeWallpaper, addNewImage, removeImage } from '../../../../store/actions/settings';

import './Wallpapers.css';

class Wallpapers extends Component {
    constructor() {
        super();
        this.state = {
            selectedImage: null
        }
    }

    validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
      }

    handleWallpaperChange = e => {
        if (document.querySelector('.wallpaper__container.active')) {
            document.querySelector('.wallpaper__container.active').classList.remove('active')
        }
        e.target.parentNode.classList.add('active');
        this.setState({
            selectedImage: e.target.parentNode.dataset.value
        })
    }

    handleUrlInput = () => {
        let urlPrompt = prompt('URL: ');

        if (urlPrompt !== null) {
            if (this.validateUrl(urlPrompt)) {
                this.props.addNewImage(urlPrompt);
            }
        }

    }

    setWallpaper = () => {
        if (this.state.selectedImage) {
            this.props.changeWallpaper(this.state.selectedImage);
        }
    }

    removeWallpaper = e => {
        e.stopPropagation();
        this.props.removeImage(e.target.parentNode.parentNode.dataset.index)

    }

    render() {
        const { data } = this.props;
        return (
            <>
                <span className="wallpaper__label">Wallpapers</span>
                <div className="wallpaper__browser">
                    {
                        Object.keys(data.wallpapers).map((item, key) => {
                            if (item !== 'active') {
                                return (
                                    <div key={key} data-index={item} data-value={data.wallpapers[item]} onClick={this.handleWallpaperChange} className="wallpaper__container">
                                        <div className="wallpaper__container--checkbox"></div>
                                        <div onClick={this.removeWallpaper} className="wallaper__container--remove">
                                            <span className="fa fa-trash"></span>
                                        </div>
                                        <img className="wallpaper__imgs" src={data.wallpapers[item]} alt=""></img>
                                    </div>
                                )
                            }
                            return (
                                ''
                            )
                        })
                    }
                </div>
                <span className="wallpaper__label">Import</span>
                <div className="wallpaper__buttons">
                    <button onClick={this.handleUrlInput} className="wallpaper__btn">From url</button>
                </div>
                <span className="wallpaper__label">Save</span>
                <div className="wallpaper__buttons">
                    <button onClick={this.setWallpaper} className="wallpaper__btn">Set wallpaper</button>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.localStorage.data
    }
}

export default connect(mapStateToProps, { changeWallpaper, addNewImage, removeImage })(Wallpapers);