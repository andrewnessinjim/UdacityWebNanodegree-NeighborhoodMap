import React, { Component } from 'react';
import SearchableList from './SearchableList';
import testData from '../test_data/sights_in_london';
import Map from './Map';
import config from '../config';

class ListAndMapContainer extends Component {
  state = {
    places: [],
    filter: "",
    selectedVenue: ""
  }

  extractRequiredDetails(jsonResponse) {
    const places = jsonResponse.response.groups
      .find(item => item.type === "Recommended Places")
      .items
      .map(place => ({
        name: place.venue.name,
        id: place.venue.id,
        location: {
          lat: place.venue.location.lat,
          lng: place.venue.location.lng
        }
      }));

    this.setState({ places });
  }

  componentWillMount() {

    if (config.stubbed) {
      this.extractRequiredDetails(testData);

    } else {
      fetch('https://api.foursquare.com/v2/venues/explore?client_id=YHR2IVO0ARLPWGNCAJJXHREDICGKN4RU1QRPUQZGP52FXQVQ&client_secret=P0KAN4DDE4XLWLI3RBUT02YLZAR4REDDGGEZLAQBRUBUX3A1&v=20180323&limit=10&ll=51.50,0.08&section=sights')
        .then(response => {
          response.json().then(data => {
            this.extractRequiredDetails(data)
          })
        })
        .catch(function () {
          // Code for handling errors
        });
    }

  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  onListClick = (event) => {
    this.setState({ selectedVenue: event.target.getAttribute('venueid') });
  }

  onCloseClick = () => {
    this.setState({ selectedVenue: "" });
  }

  render() {
    const filteredPlaces = this.state.places
      .filter(place => place.name.match(new RegExp(this.state.filter, "i")));
    return (
      <div className="list-map-container">
        <SearchableList
          items={filteredPlaces}
          listVisible={this.props.listVisible}
          onFilterChange={this.handleFilterChange}
          filter={this.state.filter}
          onListClick={this.onListClick}
          selectedVenueId={this.state.selectedVenue}
        />
        <Map
          places={filteredPlaces}
          selectedVenueId={this.state.selectedVenue}
          onCloseClick={this.onCloseClick}
        />
      </div>
    );
  }
}

export default ListAndMapContainer;