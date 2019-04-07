import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notepad from './notepad/Notepad';
import Link from '../../components/programs/link/Link';
import MusicPlayer from '../../components/programs/musicPlayer/MusicPlayer';

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
                            if (app.type === 'txt') {
                                return (
                                    <Notepad appData={app} key={item} />
                                )
                            }
                            if (app.type === 'link') {
                                return (
                                    <Link minimalized={app.minimalized} index={app.index} key={item} />
                                )
                            }
                            if (app.type === 'audio') {
                                return (
                                    <MusicPlayer appData={app} key={item} />
                                )
                            }
                            return (
                                ''
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