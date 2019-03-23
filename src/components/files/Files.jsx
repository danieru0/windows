import React, { Component } from 'react';

import Txt from './txt/Txt';

import './Files.css';

class Files extends Component {

    render() {
        const { files } = this.props;
        return (
            <>
                {
                    Object.keys(files).map((item, key) => {
                        let file = files[key];
                        if (file.type === 'txt') {
                            return (
                                <Txt key={item} name={file.name} background={file.background} />
                            )
                        }
                        return ('')
                    })
                }
            </>
        )
    }
}

export default Files;