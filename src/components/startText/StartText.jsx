import React, { Component } from 'react';
import { connect } from 'react-redux';

import './StartText.css';

class StartText extends Component {
    constructor() {
        super();
        this.state = {
            time: new Date().toLocaleTimeString(),
            message: null
        }
    }

    componentDidMount() {
        this.clockInterval = setInterval(() => {
            let time = new Date().toLocaleTimeString();
            let hours = time.split(':')[0];
            if (hours >= 0 && hours < 12) {
                this.setState({ message: 'Good morning' });
            }
            if (hours >= 12 && hours < 17) {
                this.setState({ message: 'Good afternoon' });
            }
            if (hours >= 17 && hours < 24) {
                this.setState({ message: 'Good evening' });
            }
            this.setState({
                time: time
            });
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.clockInterval);
    }

    render() {
        const { data } = this.props;
        return (
            <div className="startText">
                {
                    this.state.message ? (
                        <>
                            <p className="startText__time">{`${this.state.time.split(':')[0]}:${this.state.time.split(':')[1]}`}</p>
                            <p className="startText__nice">{`${this.state.message}, ${data.name}.`}</p>
                        </>
                    ) : (
                        <>
                            <p className="startText__time">{`${this.state.time.split(':')[0]}:${this.state.time.split(':')[1]}`}</p>
                            <p className="startText__nice">&nbsp;</p>
                        </>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.localStorage.data
    }
}

export default connect(mapStateToProps, null)(StartText);