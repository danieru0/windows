import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notepad from './notepad/Notepad';

import { getRunningApplications } from '../../store/actions/localStorage';

class Programs extends Component {
    componentDidMount() {
        this.props.getRunningApplications();
    }

    render() {
        const { applications } = this.props
        return (
            <>
                {
                    applications ? (
                        Object.keys(applications.active).map((item, key) => {
                            let app = applications.active[item];
                            return (
                                <Notepad appData={app} key={item} />
                            )
                        })
                    ) : (
                        ''
                    )
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        applications: state.localStorage.apps
    }
}

export default connect(mapStateToProps, { getRunningApplications })(Programs);