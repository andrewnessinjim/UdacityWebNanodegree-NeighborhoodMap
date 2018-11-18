import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ListAndMapContainer from './components/ListAndMapContainer';

class App extends Component {
  state = {
    listVisible: true
  }

  onHamClick = () => {
    this.toggleHam();
  }

  toggleHam() {
    this.setState((prevState) => {
      return {
        listVisible: !prevState.listVisible
      };
    });
  }

  render() {
    const {listVisible} = this.state;
    return (
      <div className="App">
        <Header onHamClick={this.onHamClick} listVisible={listVisible}/>
        <ListAndMapContainer listVisible={listVisible}/>
      </div>
    );
  }
}

export default App;