import React, { Component } from 'react';
import './styles/App.css';
import Header from './components/Header';
import ListAndMapContainer from './components/ListAndMapContainer';
import ErrorPanel from './components/ErrorPanel';

class App extends Component {
  state = {
    listVisible: true, //Track if list is visible/hidden
    errorMessage: "" //Track errors
  }

  onHamClick = () => {
    this.toggleHam();
  }

  toggleHam() {
    this.setState((prevState) => {
      return {
        listVisible: !prevState.listVisible //Invert the state
      };
    });
  }

  onError = (errorMessage) =>  {
    this.setState({ errorMessage })
  }

  render() {
    const { listVisible } = this.state;
    return (
      <div className="App">
        <Header onHamClick={this.onHamClick} listVisible={listVisible} />
        <ListAndMapContainer listVisible={listVisible} onError={this.onError} />

        {/*Show error panel if errorMessage is set by any children*/}
        {(this.state.errorMessage && <ErrorPanel message={this.state.errorMessage} />)}
      </div>
    );
  }
}

export default App;