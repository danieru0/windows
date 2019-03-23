import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLocalStorageJSON } from './store/actions/localStorage';

class App extends Component {

  componentDidMount() {
    this.props.getLocalStorageJSON();
  }

  render() {
    return (
      <div className="App">
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
