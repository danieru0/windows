import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLocalStorageJSON } from './store/actions/localStorage';

import LoadingScreen from './components/loadingScreen/loadingScreen';
import Files from './components/files/Files';
import Programs from './components/programs/Programs';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.getLocalStorageJSON();
  }

  render() {
    const { data } = this.props;
    return (
      data ? (
        <div style={{ backgroundImage: `url(${data.wallpapers.active})` }} className="App">
          <Files files={data.files} />
          <Programs />
        </div>
      ) : (
        <LoadingScreen />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.localStorage.data
  }
}

export default connect(mapStateToProps, { getLocalStorageJSON })(App);
