import React, { Component } from 'react';
import SearchableList from './SearchableList';
import testData from '../test_data/sights_in_london';
import Map from './Map';

class ListAndMapContainer extends Component {
  state = {
    places: []
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

  render() {
    console.log(this.state.places);
    return (
      <div className="list-map-container">
        <SearchableList
          items={this.state.places.map(place => ({ name: place.name, id: place.id }))}
          listVisible={this.props.listVisible}
        />
        <Map places={this.state.places}/>
      </div>
    );
  }
}

export default ListAndMapContainer;