import React, { Component } from 'react';

class Txt extends Component {

    render() {
        const { name, background } = this.props;
        return (
            <div className="file">
                <img className="file__img" alt="file" src={background}></img>
                <p className="file__name">{name}</p>
            </div>
        )
    }
}

export default Txt;