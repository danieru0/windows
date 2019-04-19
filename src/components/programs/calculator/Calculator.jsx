import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

import { removeRunningAppFromLocalStorage, toggleMinimalizeApp } from '../../../store/actions/localStorage';

import './Calculator.css';

class Calculator extends Component {

    handleCloseButton = () => {
        this.props.removeRunningAppFromLocalStorage(this.props.applications, this.props.appData.index);
    }

    handleMinimalizeButton = () => {
        this.props.toggleMinimalizeApp(this.props.applications, this.props.appData.index);
    }

    componentDidMount() {
        let calculator = document.getElementById('calculator'),
            result = document.getElementById('calculator__result');
        
        calculator.addEventListener('click', e => {
            if (e.target.className === 'calculator__btn') {
                result.textContent += e.target.value;
            }

            if (e.target.id === 'calculator-clear') {
                result.innerHTML = null;
            }

            if (e.target.id === 'calculator-remove') {
                result.innerHTML = result.innerHTML.slice(0, -1);
            }

            if (e.target.id === 'calculator-eq') {
                // eslint-disable-next-line
                result.innerHTML = eval(result.innerHTML);
            }
        })
    }

    render() {
        const { appData } = this.props;
        return (
            <Draggable handle=".calculator__topbar" bounds="body">
                <div id="calculator" className={appData.minimalized ? "calculator minimalized" : "calculator"}>
                    <div className="calculator__topbar">
                    <span className="calculator__name">Calculator</span>
                        <div className="calculator__program-options">
                            <button onClick={this.handleMinimalizeButton} className="calculator__minimalize">
                                <span className="calculator__minimalize-icon fa fa-window-minimize"></span>
                            </button>                            
                            <button onClick={this.handleCloseButton} className="calculator__close">
                                <span className="calculator__close-icon fa fa-times"></span>
                            </button>
                        </div>
                    </div>
                    <div id="calculator__result" className="calculator__result"></div>
                    <div className="calculator__row">
                        <button id="calculator-clear" className="calculator__btn">C</button>
                        <button value="%" className="calculator__btn">%</button>
                        <button id="calculator-remove" className="calculator__btn">{`<`}</button>
                        <button value="/" className="calculator__btn">/</button>
                    </div>
                    <div className="calculator__row">
                        <button value="7" className="calculator__btn">7</button>
                        <button value="8" className="calculator__btn">8</button>
                        <button value="9" className="calculator__btn">9</button>
                        <button value="*" className="calculator__btn">*</button>
                    </div>
                    <div className="calculator__row">
                        <button value="4" className="calculator__btn">4</button>
                        <button value="5" className="calculator__btn">5</button>
                        <button value="6" className="calculator__btn">6</button>
                        <button value="-" className="calculator__btn">-</button>
                    </div>
                    <div className="calculator__row">
                        <button value="1" className="calculator__btn">1</button>
                        <button value="2" className="calculator__btn">2</button>
                        <button value="3" className="calculator__btn">3</button>
                        <button value="+" className="calculator__btn">+</button>
                    </div>
                    <div className="calculator__row">
                        <button value="0" className="calculator__btn">0</button>
                        <button value="." className="calculator__btn">.</button>
                        <button id="calculator-eq" className="calculator__btn">=</button>
                    </div>
                </div>
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        applications: state.localStorage.apps
    }
}

export default connect(mapStateToProps, { toggleMinimalizeApp, removeRunningAppFromLocalStorage })(Calculator);