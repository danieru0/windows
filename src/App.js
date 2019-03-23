import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingScreen from './components/loadingScreen/loadingScreen';

import { getLocalStorageJSON } from './store/actions/localStorage';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.getLocalStorageJSON();
  }

  render() {
    const { data } = this.props;
    console.log(data);
    return (
      data ? (
        <div style={{ backgroundImage: `url(${data.wallpapers.active})` }} className="App">
          
        </div>
      ) : (
        <LoadingScreen />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.localStorage.data ? state.localStorage.data[0] : null,
  }
}

export default connect(mapStateToProps, { getLocalStorageJSON })(App);
