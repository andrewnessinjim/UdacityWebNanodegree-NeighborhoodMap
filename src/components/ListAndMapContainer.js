import React, { Component } from 'react';
import SearchableList from './SearchableList';
import testData from '../test_data/sights_in_london';

class ListAndMapContainer extends Component {
  state = {
    places: []
  }

  componentWillMount() {
    this.setState({ places: testData.response.groups.find(item => item.type === "Recommended Places").items })
  }

  render() {
    console.log(this.state.places);
    return (
      <div className="list-map-container">
        <SearchableList items={this.state.places.map(place => ({ name: place.venue.name, id: place.venue.id }))}></SearchableList>
      </div>
    );
  }
}

export default ListAndMapContainer;