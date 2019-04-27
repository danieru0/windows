import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLocalStorageJSON } from './store/actions/localStorage';
import { createNewAudioFile } from './store/actions/musicPlayer';
import { createNewVideoFile } from './store/actions/videoPlayer';  
import { createNewImageFile } from './store/actions/imageViewer';

import LoadingScreen from './components/loadingScreen/loadingScreen';
import Files from './components/files/Files';
import Programs from './components/programs/Programs';
import Taskbar from './components/taskbar/Taskbar';
import ContextMenu from './components/contextMenu/contextMenu';
import StartText from './components/startText/StartText';

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
          clickedElementId: e.target.parentElement.id
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

  handleInputFileChange = e => {
    const file = e.target.files[0];
    const inputType = e.target.id;
    const reader = new FileReader();
    reader.onload = e => {
      if (inputType === 'audioInput') {
        if (file.type === 'audio/mp3' || file.type === 'audio/mpeg') {
          this.props.createNewAudioFile(this.props.data, file.name, e.target.result);
        }
      }
      if (inputType === 'videoInput') {
        if (file.type === 'video/mp4') {
          this.props.createNewVideoFile(this.props.data, file.name, e.target.result);
        }
      }
      if (inputType === 'imageInput') {
        if (file.type === 'image/jpeg') {
          this.props.createNewImageFile(this.props.data, file.name, e.target.result);
        }
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  openInputFile = action => {
    switch(action) {
      case 'mp3':
        document.getElementById('audioInput').click();
        break;
      case 'mp4':
        document.getElementById('videoInput').click();
        break;
      case 'jpg':
        document.getElementById('imageInput').click();
        break;
      default: break;
    }
  }

  render() {
    const { data } = this.props;
    return (
      data ? (
        <div style={{ backgroundImage: `url(${data.wallpapers.active})` }} className="App">
          <input name="audio" accept="audio/mp3" onChange={this.handleInputFileChange} style={{display: 'none'}} type="file" id="audioInput"></input>
          <input name="video" accept="video/mp4" onChange={this.handleInputFileChange} style={{display: 'none'}} type="file" id="videoInput"></input>
          <input name="image" accept="image/jpeg" onChange={this.handleInputFileChange} style={{display: 'none'}} type="file" id="imageInput"></input>
          <StartText />
          <Files files={data.files} />
          <Programs />
          <ContextMenu openInputFile={this.openInputFile} handleClickedItem={() => this.setState({ contextMenuActive: false })} active={this.state.contextMenuActive} clickedElement={this.state.clickedElement} clickedElementId={this.state.clickedElementId} left={this.state.contextMenuLeft} top={this.state.contextMenuTop}/>
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

export default connect(mapStateToProps, { getLocalStorageJSON, createNewAudioFile, createNewVideoFile, createNewImageFile })(App);
