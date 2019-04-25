import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notepad from './notepad/Notepad';
import Link from '../../components/programs/link/Link';
import MusicPlayer from '../../components/programs/musicPlayer/MusicPlayer';
import VideoPlayer from '../../components/programs/videoPlayer/VideoPlayer';
import Settings from './settings/Settings';
import Calculator from './calculator/Calculator';
import Terminal from './terminal/Terminal';
import Paint from './paint/Paint';

import { getRunningApplications } from '../../store/actions/localStorage';

class Programs extends Component {
    componentDidMount() {
        this.props.getRunningApplications();
    }

    makeFirst = program => {
        if (program.nextElementSibling.className !== 'taskbar') {
            program.parentNode.insertBefore(program, document.querySelector('.taskbar'));
        }
    }

    render() {
        const { applications } = this.props
        return (
            <>
                {
                    applications ? (
                        Object.keys(applications.active).map((item) => {
                            let app = applications.active[item];
                            if (app.type === 'txt') {
                                return (
                                    <Notepad onClick={this.makeFirst} appData={app} key={item} />
                                )
                            }
                            if (app.type === 'link') {
                                return (
                                    <Link onClick={this.makeFirst} minimalized={app.minimalized} index={app.index} key={item} />
                                )
                            }
                            if (app.type === 'audio') {
                                return (
                                    <MusicPlayer onClick={this.makeFirst} appData={app} key={item} />
                                )
                            }
                            if (app.type === 'video') {
                                return (
                                    <VideoPlayer onClick={this.makeFirst} appData={app} key={item} />
                                )
                            }
                            if (app.type === 'settings') {
                                return (
                                    <Settings onClick={this.makeFirst} appData={app} key={item} />
                                )
                            }
                            if (app.type === 'calculator') {
                                return (
                                    <Calculator onClick={this.makeFirst} appData={app} key={item} />
                                )
                            }
                            if (app.type === 'terminal') {
                                return (
                                    <Terminal onClick={this.makeFirst} appData={app} key={item} />
                                ) 
                            }
                            if (app.type === 'paint') {
                                return (
                                    <Paint onClick={this.makeFirst} appData={app} key={item} />
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