import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetFilesPosition, resetApp } from '../../../../store/actions/settings';

import './Reset.css';

class Reset extends Component {

    resetPosition = () => {
        if (window.confirm('Reset files positions and refresh page?')) {
            this.props.resetFilesPosition();
        }
    }

    resetApp = () => {
        if (window.confirm('Are you sure?')) {
            this.props.resetApp();
        }
    }

    render() {
        return (
            <>
                <button onClick={this.resetPosition} className="reset__btn">Reset files position</button>
                <button onClick={this.resetApp} className="reset__btn">Reset app</button>
            </>
        )
    }
}

export default connect(null, { resetFilesPosition, resetApp })(Reset);