import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeUserName } from '../../../../store/actions/settings';

import './Informations.css';

class Informations extends Component {
    constructor() {
        super();
        this.state = {
            browserName: 'unknown',
            browserVer: 'unknown',
            buttonText: 'change',
            inputValue: null
        }
    }

    componentDidMount() {
        navigator.browserSpecs = (function(){
            var ua = navigator.userAgent, tem, 
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if(/trident/i.test(M[1])){
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return {name:'IE',version:(tem[1] || '')};
            }
            if(M[1]=== 'Chrome'){
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if(tem != null) return {name:tem[1].replace('OPR', 'Opera'),version:tem[2]};
            }
            M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
            if((tem = ua.match(/version\/(\d+)/i))!= null)
                M.splice(1, 1, tem[1]);
            return {name:M[0], version:M[1]};
        })();

        this.setState({
            browserName: navigator.browserSpecs.name,
            browserVer: navigator.browserSpecs.version,
            inputValue: this.props.data.name
        });
    }

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    }

    toggleNameChange = e => {
        if (e.target.value === 'change') {
            this.setState({
                buttonText: 'save'
            })
            e.target.value = 'save';
            document.querySelector('.informations__name').style.display = 'none';
            document.querySelector('.informations__input').classList.add('active');
        } else {
            this.props.changeUserName(this.state.inputValue);
            this.setState({
                buttonText: 'change'
            })
            e.target.value = 'change';
            document.querySelector('.informations__name').style.display = 'block';
            document.querySelector('.informations__input').classList.remove('active');
        }
    }

    render() {
        const { data } = this.props;
        return (
            <>
                <p className="informations__browsername">{this.state.browserName}</p>
                <p className="informations__browserver">{this.state.browserVer}</p>
                <div className="informations__username">
                    <p className="informations__name">{data.name}</p>
                    <input onChange={this.handleInputChange} className="informations__input" defaultValue={data.name}></input>
                    <button onClick={this.toggleNameChange} value="change" className="informations__btn">{this.state.buttonText}</button>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.localStorage.data
    }
}

export default connect(mapStateToProps, { changeUserName })(Informations);