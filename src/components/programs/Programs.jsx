import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notepad from './notepad/Notepad';
import Link from '../../components/programs/link/Link';
import MusicPlayer from '../../components/programs/musicPlayer/MusicPlayer';
import VideoPlayer from '../../components/programs/videoPlayer/VideoPlayer';
import Settings from './settings/Settings';

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
                                    <Notepad appData={app} key={key} />
                                )
                            }
                            if (app.type === 'link') {
                                return (
                                    <Link minimalized={app.minimalized} index={app.index} key={key} />
                                )
                            }
                            if (app.type === 'audio') {
                                return (
                                    <MusicPlayer appData={app} key={key} />
                                )
                            }
                            if (app.type === 'video') {
                                return (
                                    <VideoPlayer appData={app} key={key} />
                                )
                            }
                            if (app.type === 'settings') {
                                return (
                                    <Settings appData={app} key={key} />
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