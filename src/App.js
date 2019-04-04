import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLocalStorageJSON } from './store/actions/localStorage';

import LoadingScreen from './components/loadingScreen/loadingScreen';
import Files from './components/files/Files';
import Programs from './components/programs/Programs';
import Taskbar from './components/taskbar/Taskbar';
import ContextMenu from './components/contextMenu/contextMenu';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contextMenuActive: false,
      contextMenuLeft: null,
      contextMenuTop: null,
      clickedElement: '',
      clickedElementId: null
    }
  }



  componentDidMount() {
    this.props.getLocalStorageJSON();
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (e.target.className === 'App' || 
          e.target.className === 'file__overlay' ||
          e.target.className === 'taskbar__file'
      ) {
        this.setState({
          contextMenuActive: true,
          contextMenuLeft: e.clientX,
          contextMenuTop: e.clientY,
          clickedElement: e.target,
          clickedElementId: e.target.id
        });
      } else if (e.target.className === 'taskbar__file-icon') {
        this.setState({
          contextMenuActive: true,
          contextMenuLeft: e.clientX,
          contextMenuTop: e.clientY,
          clickedElement: e.target.parentElement,
          clickedElementId: e.target.id
        });
      }

    });

    document.addEventListener('click', (e) => {
      if (this.state.contextMenuActive === true) {
        if (e.target.className !== 'contextMenu__item') {
          this.setState({ contextMenuActive: false });
        }
      }
    });
  }

  render() {
    const { data } = this.props;
    return (
      data ? (
        <div style={{ backgroundImage: `url(${data.wallpapers.active})` }} className="App">
          <Files files={data.files} />
          <Programs />
          <ContextMenu handleClickedItem={() => this.setState({ contextMenuActive: false })} active={this.state.contextMenuActive} clickedElement={this.state.clickedElement} clickedElementId={this.state.clickedElementId} left={this.state.contextMenuLeft} top={this.state.contextMenuTop}/>
          <Taskbar />
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
