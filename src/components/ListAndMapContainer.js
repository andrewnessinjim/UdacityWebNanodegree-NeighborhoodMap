import React, { Component } from 'react';
import SearchableList from './SearchableList';
import testData from '../test_data/sights_in_london';
import Map from './Map';

class ListAndMapContainer extends Component {
  state = {
    places: [],
    filter: ""
  }

  componentWillMount() {
    this.setState({
      places: testData.response.groups
        .find(item => item.type === "Recommended Places")
        .items
        .map(place => ({
          name: place.venue.name,
          id: place.venue.id,
          location: {
            lat: place.venue.location.lat,
            lng: place.venue.location.lng
          }
        }))
    });
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  render() {
    const filteredPlaces = this.state.places
      .filter(place => place.name.match(new RegExp(this.state.filter,"i")));
    return (
      <div className="list-map-container">
        <SearchableList
          items={filteredPlaces}
          listVisible={this.props.listVisible}
          onFilterChange={this.handleFilterChange}
          filter={this.state.filter}
        />
        <Map places={filteredPlaces}/>
      </div>
    );
  }
}

export default ListAndMapContainer;