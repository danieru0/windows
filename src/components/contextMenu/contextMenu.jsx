import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createNewTxtFile } from '../../store/actions/contextMenu';

import './contextMenu.css';

class ContextMenu extends Component {

    createNewTxtFile = () => {
        this.props.createNewTxtFile(this.props.data);
        this.props.handleClickedItem();
    }

    render() {
        const { active, clickedElement, left, top } = this.props;

        if (!active) {
            return false;
        }

        return (
            <div style={{left: left, top: top}} className="contextMenu">
                <ul className="contextMenu__list">
                    {
                        clickedElement.className === 'App' ? (
                            <>
                                <li onClick={() => alert('clicked')} className="contextMenu__item">
                                    New anchor file
                                </li>
                                <li onClick={this.createNewTxtFile} className="contextMenu__item">
                                    New txt file
                                </li>
                            </>
                        ) : (
                            ''
                        )
                    }
                    {
                        clickedElement.className === 'file__overlay' ? (
                            <>
                                <li className="contextMenu__item">
                                    Rename file
                                </li>
                                <li className="contextMenu__item">
                                    Delete file
                                </li>
                            </>
                        ) : (
                            ''
                        )
                    }
                    {
                        clickedElement.className === 'taskbar__file' ? (
                            <>
                                <li className="contextMenu__item">
                                    Close file
                                </li>
                            </>
                        ) : (
                            ''
                        )
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.localStorage.data
    }
}

export default connect(mapStateToProps, { createNewTxtFile })(ContextMenu);