import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import LoadingScreen from './components/loadingScreen/loadingScreen';

import { getLocalStorageJSON } from './store/actions/localStorage';

class App extends Component {

  componentDidMount() {
    this.props.getLocalStorageJSON();
  }

  render() {
    return (
      <div className="App">
        <LoadingScreen active={this.props.data ? false : true} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.localStorage.data,
  }
}

export default connect(mapStateToProps, { getLocalStorageJSON })(App);
