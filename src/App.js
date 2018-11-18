import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ListAndMapContainer from './components/ListAndMapContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <ListAndMapContainer/>
      </div>
    );
  }
}

export default App;
